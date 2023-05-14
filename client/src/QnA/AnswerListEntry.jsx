import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnswerListEntry({ answer, grabAnswers }) {
  const [ansHelpful, setAnsHelpful] = useState(false);
  const [report, setReport] = useState(false);

  const date = new Date(answer.date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',

  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  const helpfulListener = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/helpful', { answer_id: answer.answer_id })
      .then((result) => {
        setAnsHelpful(!ansHelpful);
      })
      .then(() => {
        grabAnswers();
      })
      .catch((err) => {
        console.log('Error with helpful answer', err);
      });
  };

  const reportListener = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/report', { answer_id: answer.answer_id })
      .then((result) => {
        setReport(!report);
      })
      .then(() => {
        grabAnswers();
      })
      .catch((err) => {
        console.log('Error reporting answer', err);
      });
  };

  // Invoking grabAnswers in the promises seems to make it render faster? Also less errors.
  // useEffect(() => {
  //   grabAnswers();
  // }, [ansHelpful]);

  return (
    <div>
      <div>{answer.body}</div>
      <span>
        by
        {' '}
        {answer.answerer_name}
        {' '}
        {formattedDate}
        {' '}
        Helpful?
        {' '}
        <button onClick={helpfulListener} type="button" disabled={ansHelpful}>
          Yes
          {' '}
          (
          {answer.helpfulness}
          )
        </button>
        <button onClick={reportListener} type="button" disabled={report}>
          {' '}
          Report
        </button>
      </span>
    </div>
  );
}

export default AnswerListEntry;
