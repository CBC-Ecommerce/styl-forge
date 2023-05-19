import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddQuestion({ product, grabQuestions, questModalClicker }) {
  const [questBody, setQuestBody] = useState('');
  const [username, setUsername] = useState('');
  const [elecmail, setElecMail] = useState('');

  const questionSubmitter = () => {
    axios.post('/qa/questions', {
      body: questBody, name: username, email: elecmail, product_id: product.id,
    })
      .then(() => {
        grabQuestions();
      })
      .then(() => {
        questModalClicker();
      })
      .catch((err) => {
        console.log('Error posting question', err);
      });
  };

  const questBodyChanger = (e) => {
    setQuestBody(e.target.value);
  };

  const usernameChanger = (e) => {
    setUsername(e.target.value);
  };

  const elecmailChanger = (e) => {
    setElecMail(e.target.value);
  };

  return (
    <div className="qna-modal" data-testid="question-modal-test">
      <div className="qna-modal-content">
        <div className="qna-modal-header">
          <h4 className="qna-modal-title">Ask Your Question!</h4>
          <h5 className="qna-modal-subtitle">
            About the
            {' '}
            {product.name}
          </h5>
        </div>
        <div className="qna-modal-body">
          <form>
            <input type="text" onChange={questBodyChanger} placeholder="Question" />
            <input type="text" onChange={usernameChanger} placeholder="Username" />
            <input type="text" onChange={elecmailChanger} placeholder="Email" />
          </form>
        </div>
        <div className="qna-modal-footer">
          <button type="button" onClick={questionSubmitter}>Submit Question</button>
          <button type="button" className="button" onClick={questModalClicker}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
