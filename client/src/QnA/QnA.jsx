import React from 'react';
import QnAList from './QnAList.jsx';

const { useState, useEffect } = React;

function QnA({ id }) {
  // useEffect(() => {
  //   axios('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/')
  // }, []);
  const [quests, setQuests] = useState([]);

  return (

    <div>
      <QnAList quests={quests} />
    </div>

  );
}

export default QnA;
