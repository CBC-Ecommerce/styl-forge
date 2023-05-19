import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Modal.css';

function AddAnswer({
  grabQuestions, showAdd, addAnswerClicker, quest, product,
}) {
  const [answer, setAnswer] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pics, setPics] = useState([]);
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
      body: answer, name: username, email: email, photos: pics,
    })
      .then(() => {
        grabQuestions();
      })
      .then(() => {
        addAnswerClicker();
      })
      .catch((err) => {
        console.log('error posting answer', err);
      });
  };

  const fileSelector = (e) => {
    const currentFiles = e.target.files;
    const fileArray = [];
    for (let i = 0; i < currentFiles.length; i++) {
      const objectURL = URL.createObjectURL(currentFiles[i]);
      fileArray.push(objectURL);
    }
    // Is promise.all required? It seems like it should do it synchronously.
    // It seems like the promise is not necessary.
    setPics(fileArray);
    // Promise.all(fileArray)
    //   .then((fileArray) => {
    //     setPics(fileArray);
    //   })
    //   .catch((err) => {
    //     console.log('Error creating array of urls', err);
    //   });
  };

  return (
    <div className="qna-modal" data-testid="addanswer-modal">
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
            <textarea className="qna-text-box" type="text" onChange={answerChanger} placeholder="Answer..." value={answer} />
            <input className="qna-username-box" type="text" onChange={usernameChanger} placeholder="Username" value={username} />
            <input type="text" onChange={emailChanger} placeholder="email" value={email} />
            <input type="file" onChange={fileSelector} id="answer-image" accept=".html, .htm, image/jpeg, image/png" multiple />
          </form>
          <img className="qna-picture" src={pics[0]} />
          <img className="qna-picture" src={pics[1]} />
          <img className="qna-picture" src={pics[2]} />
          <img className="qna-picture" src={pics[3]} />
          <img className="qna-picture" src={pics[4]} />
        </div>
        <div className="qna-modal-footer">
          <button className="button" onClick={submitAnswer} type="button">Submit Answer</button>
          <button type="button" className="button" onClick={closeClicker}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddAnswer;
