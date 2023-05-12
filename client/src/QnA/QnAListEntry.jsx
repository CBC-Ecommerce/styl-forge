import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerListEntry from './AnswerListEntry.jsx';
import AddAnswer from './AddAnswer.jsx';

function QnAListEntry({ quest, product, grabQuestions }) {
  // console.log('This is quest:', quest);
  const [answers, setAnswers] = useState([]);
  const [ansEntry, setAnsEntry] = useState(2);
  const [anyMore, setAnyMore] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [helpButton, setHelpButton] = useState(false);
  const grabAnswers = () => {
    const config = { params: { page: 1, count: 9999 } };
    axios.get(`/qa/questions/${quest.question_id}/answers`, config)
      .then((info) => {
        setAnswers(info.data.results);
        // This also works instead of the useEffect for answers.length
        // if (info.data.results.length <= 2) {
        //   setAnyMore(false);
        // }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    // console.log(quest);
    grabAnswers();
  }, []);

  useEffect(() => {
    // console.log(answers);
    if (answers.length > 2) {
      setAnyMore(true);
    }
  }, [answers]);

  const submitHandler = (e) => {
    e.preventDefault();
    setAnsEntry(answers.length);
    setAnyMore(false);
  };

  const addAnswerClicker = () => {
    setShowAdd(!showAdd);
  };
  // console.log(typeof quest.question_id);

  const questionHelpful = (e) => {
    e.preventDefault();
    axios.put('/qa/questions/helpful', { question_id: quest.question_id })
      .then((result) => {
        console.log(result.data);
        setHelpButton(!helpButton);
        grabQuestions();
      })
      .catch((error) => {
        console.log(error);
      });
    // setHelpButton(!helpButton);
  };

  return (

    <div className="individual-question" data-testid="individual-question-test">
      <div className="question">
        Q:
        {' '}
        {quest.question_body}
        {' '}
        <span className="question-buttons">
          Helpful?
          {' '}
          <button className="helpful-question-button" onClick={questionHelpful} type="button" disabled={helpButton}>
            Yes
            {' '}
            (
            {quest.question_helpfulness}
            )
          </button>
          <button className="add-answer-button" type="button" onClick={addAnswerClicker}>Add Answer</button>
          <AddAnswer
            showAdd={showAdd}
            addAnswerClicker={addAnswerClicker}
            quest={quest}
            product={product}
          />
        </span>
      </div>
      <div className="answer">
        A:
        {' '}
        {answers.slice(0, ansEntry)
          .map((answer) => <AnswerListEntry answer={answer} key={answer.answer_id} />)}
      </div>
      {anyMore ? (
        <form onSubmit={submitHandler}>
          <input type="submit" value="See More Answers" />
        </form>
      ) : null}
    </div>
  );
}

export default QnAListEntry;
