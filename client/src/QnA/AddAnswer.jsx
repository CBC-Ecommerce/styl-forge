import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAnswer({
  grabAnswers, showAdd, addAnswerClicker, quest, product,
}) {
  const [answer, setAnswer] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  if (!showAdd) {
    return null;
  }
  const closeClicker = () => {
    addAnswerClicker();
  };
  const answerChanger = (e) => {
    setAnswer(e.target.value);
  };
  const usernameChanger = (e) => {
    setUsername(e.target.value);
  };
  const emailChanger = (e) => {
    setEmail(e.target.value);
  };
  const submitAnswer = () => {
    axios.post(`/qa/questions/${quest.question_id}/answers`, {
      // eslint-disable-next-line object-shorthand
      body: answer, name: username, email: email, photos: [],
    })
      .then(() => {
        grabAnswers();
      })
      .then(() => {
        addAnswerClicker();
      })
      .catch((err) => {
        console.log('error posting answer', err);
      });
  };

  return (
    <div className="qna-modal">
      <div className="qna-modal-content">
        <div className="qna-modal-header">
          <h4 className="qna-modal-title">Submit Your Answer</h4>
          <h5 className="qna-modal-subtitle">
            {product.name}
            :
            {' '}
            {quest.question_body}
          </h5>
        </div>
        <div className="qna-modal-body">
          <form id="answer-form" onSubmit={submitAnswer}>
            <input type="text" onChange={answerChanger} placeholder="Answer..." value={answer} />
            <input type="text" onChange={usernameChanger} placeholder="Username" value={username} />
            <input type="text" onChange={emailChanger} placeholder="email" value={email} />
            {/* <input type="file" id="answer-image" accept="image/*" multiple /> */}
            {/* <div className="qna-modal-footer">
              <input type="submit" value="Submit Answer" />
            </div> */}
          </form>
        </div>
        <div className="qna-modal-footer">
          <button onClick={submitAnswer} type="button">Submit Answer</button>
          <button type="button" className="button" onClick={closeClicker}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddAnswer;
