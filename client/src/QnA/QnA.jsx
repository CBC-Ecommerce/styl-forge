import React from 'react';
import axios from 'axios';
import QnAList from './QnAList.jsx';
import AddQuestion from './AddQuestion.jsx';

const { useState, useEffect } = React;

function QnA({ id, product }) {
  const [quests, setQuests] = useState([]);
  const [questModal, setQuestModal] = useState(false);

  const grabQuestions = () => {
    const config = { params: { product_id: id, page: 1, count: 99999 } };
    axios.get('/qa/questions', config)
      .then((response) => {
        setQuests(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const questModalClicker = () => {
    setQuestModal(!questModal);
  };

  useEffect(() => {
    grabQuestions();
  }, []);

  useEffect(() => {
    grabQuestions();
  }, [id]);

  return (

    <div className="QnA div" data-testid="QnA Test">
      <button type="button" onClick={questModalClicker}>Add Question</button>
      {questModal ? (
        <AddQuestion
          product={product}
          grabQuestions={grabQuestions}
          questModalClicker={questModalClicker}
        />
      ) : null }
      <QnAList quests={quests} product={product} grabQuestions={grabQuestions} />
    </div>

  );
}

export default QnA;
