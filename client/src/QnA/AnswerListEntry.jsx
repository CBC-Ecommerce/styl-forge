import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import './style/AnswerListEntry.css';

function AnswerListEntry({ answer, grabQuestions }) {
  const [ansHelpful, setAnsHelpful] = useState(JSON.parse(localStorage.getItem(`${answer.id}`)));
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
    axios.put('/qa/answers/helpful', { answer_id: answer.id })
      .then((result) => {
        setAnsHelpful(!ansHelpful);
        localStorage.setItem(`${answer.id}`, 'true');
      })
      .then(() => {
        grabQuestions();
      })
      .catch((err) => {
        console.log('Error with helpful answer', err);
      });
  };

  const reportListener = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/report', { answer_id: answer.id })
      .then((result) => {
        setReport(!report);
      })
      .then(() => {
        grabQuestions();
      })
      .catch((err) => {
        console.log('Error reporting answer', err);
      });
  };

  return (
    <div className="answer-individual" data-testid="answer-individual-test">
      <div className="answer-first-line">
        <div className="answer-text">
          <div className="big-A">
            A:
            {' '}
          </div>
          <div className="answer-body">
            {answer.body}
          </div>
        </div>
        <div className="answer-buttons">
          <div className="helpful-text">
            Helpful?
            {' '}
            <button className="button" onClick={helpfulListener} type="button" disabled={ansHelpful}>
              Yes (
              {answer.helpfulness}
              )
            </button>
            <button className="button" onClick={reportListener} type="button" disabled={report}>
              Report
            </button>
          </div>
        </div>
      </div>
      <div className="answer-photo-container">
        {answer.photos.map((photo) => (
          <Photos photo={photo} key={photo} />
        ))}
      </div>
      <div className="answerer-info">
        <div className="answer-username">
          by:
          {' '}
          {answer.answerer_name}
          {' '}
          on
          {' '}
          {formattedDate}
        </div>
      </div>
    </div>
  );
}

export default AnswerListEntry;
