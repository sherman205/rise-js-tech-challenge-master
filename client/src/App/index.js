import React from 'react';
import Flexbox from 'flexbox-react';
import KnowledgeCheck from '../KnowledgeCheck';
import './styles.css';

const App = () => {
  return (
    <Flexbox className="App" justifyContent="center" alignItems="center" >
      <KnowledgeCheck />
    </Flexbox>
);
}

export default App;
