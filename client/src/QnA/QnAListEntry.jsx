import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerListEntry from './AnswerListEntry.jsx';

function QnAListEntry({ quest }) {
  const [answers, setAnswers] = useState([]);
  const grabAnswers = () => {
    axios(`/qa/questions/${quest.question_id}/answers?page=1&count=9999`)
      .then((info) => {
        setAnswers(info.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    grabAnswers();
  }, []);
  return (

    <div>
      <div>
        Q:
        {' '}
        {quest.question_body}
      </div>
      <div>
        A:
        {' '}
        {answers.slice(0, 2)
          .map((answer) => <AnswerListEntry answer={answer} key={answer.answer_id} />)}
      </div>
    </div>
  );
}

export default QnAListEntry;
