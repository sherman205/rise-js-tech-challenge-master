import React, { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Flexbox from 'flexbox-react';
import ResultBox from '../ResultBox';
import './styles.css';

const KnowledgeCheck = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [selectedOption, setSelectedOption] = useState({});
    const [knowledgeCheck, setKnowledgeCheck] = useState([]);
    const [currentKnowledgeCheck, setCurrentKnowledgeCheck] = useState(0);

    useEffect(() => {
        fetch(
          `http://localhost:5000/knowledge-check-blocks`,
          {
            method: "GET"
          }
        )
        .then(res => res.json())
        .then(response => {
            setKnowledgeCheck(response);
            response.map((item, index) => {
                if (item.isCurrentKnowledgeCheck) {
                    setCurrentKnowledgeCheck(index);
                    item.answers.map(option => {
                        if (option.isSelected) {
                            setSelectedOption(option);
                            option.isCorrect ? setIsCorrect(true) : setIsCorrect(false);
                        }
                        if (item.isSubmitted) {
                            setHasSubmitted(true);
                        }
                    })
                }
            })
        })
        .catch(error => console.log(error));
    }, []);

    const handleChange = (option) => {
        setSelectedOption(option);
        const data = { optionText: option.text };
        fetch(
            `http://localhost:5000/knowledge-check-blocks/${knowledgeCheck[currentKnowledgeCheck].id}`,
            {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then(res => res.json())
        .catch(error => console.log(error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (selectedOption.isCorrect) {
            setIsCorrect(true);
        }
        else {
            setIsCorrect(false);
        }

        const data = {
            submitted: true,
            optionText: selectedOption.text
        };
        fetch(
            `http://localhost:5000/knowledge-check-blocks/${knowledgeCheck[currentKnowledgeCheck].id}`,
            {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then(res => res.json())
        .catch(error => console.log(error));
    }

    const clearForm = (reset, current) => {
        setIsCorrect(null);
        setSelectedOption({});
        setHasSubmitted(false);

        if (reset) {
            setCurrentKnowledgeCheck(0);
        }

        const data = {
            submitted: false,
            optionText: ""
        };
        fetch(
            `http://localhost:5000/knowledge-check-blocks/${knowledgeCheck[current].id}`,
            {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then(res => res.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    return (
        <Flexbox className="knowledge-check-wrapper" flexDirection="column">
            <form onSubmit={handleSubmit}>
                <p className="question">{knowledgeCheck[currentKnowledgeCheck]?.question.text}</p>
                <Zoom>
                    {knowledgeCheck[currentKnowledgeCheck] &&
                        <img className="knowledge-check-img" alt="knowledge-check-img" src={knowledgeCheck[currentKnowledgeCheck].question.media.url} />
                    }
                </Zoom>
                <div className="divider"></div>
                <div className="radio-options-box">
                    {knowledgeCheck[currentKnowledgeCheck]?.answers.map((answer, index) => (
                        <div className={`radio-option ${answer.text === selectedOption.text && hasSubmitted ? "selected" : ""}`} disabled={hasSubmitted} key={index}>
                            <label>
                                <input type="radio" disabled={hasSubmitted} checked={answer.text === selectedOption.text} onChange={() => handleChange(answer)}/>
                                {answer.text}
                            </label>
                        </div>
                    ))}
                </div>
                {!hasSubmitted &&
                    <Flexbox className="button-container" justifyContent="center">
                        <button className="submit-btn" disabled={!selectedOption.text || hasSubmitted} type="submit">Submit</button>
                    </Flexbox>
                }
        </form>
            {hasSubmitted &&
               <ResultBox
                    currentKnowledgeCheck={currentKnowledgeCheck}
                    feedback={knowledgeCheck[currentKnowledgeCheck].feedback}
                    isCorrect={isCorrect}
                    clearForm={clearForm}
                    setCurrentKnowledgeCheck={setCurrentKnowledgeCheck}
                    shouldIterate={currentKnowledgeCheck < knowledgeCheck.length - 1 || false}
                />
            }
        </Flexbox>
    );
}

export default KnowledgeCheck;
