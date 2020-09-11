import React from 'react';
import Flexbox from 'flexbox-react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ReplayIcon from '@material-ui/icons/Replay';
import './styles.css';


const ResultBox = ({
    currentKnowledgeCheck,
    feedback,
    isCorrect,
    clearForm,
    setCurrentKnowledgeCheck,
    shouldIterate
}) => {
    const nextQuestion = () => {
        const current = currentKnowledgeCheck + 1;
        setCurrentKnowledgeCheck(current);
        clearForm(false, current);
    }

    return (
        <Flexbox className="result-box-wrapper" flexDirection="column">
            <div className="result">
                {isCorrect ?
                    <>
                        <CheckCircleOutlineIcon />
                        <div>Correct</div>
                    </> :
                    <>
                        <HighlightOffIcon />
                        <div>Incorrect</div>
                    </>
                }
                <div className="feedback">{feedback}</div>
            </div>
            <Flexbox>
                <Flexbox className="reload-form" onClick={() => clearForm(true, 0)} flexDirection="column" alignItems="center">
                    <div>Take again</div>
                    <ReplayIcon className="small-icon"/>
                </Flexbox>
                {shouldIterate &&
                    <Flexbox className="reload-form" onClick={nextQuestion} flexDirection="column" alignItems="center">
                        <div>Next question</div>
                        <TrendingFlatIcon className="small-icon"/>
                    </Flexbox>
                }
            </Flexbox>
        </Flexbox>
    );
}

export default ResultBox
