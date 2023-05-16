import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerListEntry from './AnswerListEntry.jsx';
import AddAnswer from './AddAnswer.jsx';

function QnAListEntry({ quest, product, grabQuestions }) {
  // console.log('This is quest:', quest);
  const [ansEntry, setAnsEntry] = useState(2);
  const [anyMore, setAnyMore] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [helpButton, setHelpButton] = useState(JSON.parse(localStorage.getItem(`${quest.question_id}`)));
  const [reportQuest, setReportQuest] = useState(false);

  // const grabAnswers = () => {
  //   const config = { params: { page: 1, count: 99999 } };
  //   axios.get(`/qa/questions/${quest.question_id}/answers`, config)
  //     .then((info) => {
  //       console.log('grabAnswers is invoked');
  //       setAnswers(info.data.results);
  //       // This also works instead of the useEffect for answers.length
  //       // if (info.data.results.length <= 2) {
  //       //   setAnyMore(false);
  //       // }
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //     });
  // };

  useEffect(() => {
    if (Object.keys(quest.answers).length <= 2) {
      setAnyMore(false);
    }
  }, [quest.answers]);

  const submitHandler = (e) => {
    e.preventDefault();
    setAnsEntry(Object.keys(quest.answers).length);
    setAnyMore(false);
  };

  const addAnswerClicker = () => {
    setShowAdd(!showAdd);
  };

  const questionHelpful = (e) => {
    e.preventDefault();
    axios.put('/qa/questions/helpful', { question_id: quest.question_id })
      .then((result) => {
        // console.log(result.data);
        setHelpButton(!helpButton);
        localStorage.setItem(`${quest.question_id}`, 'true');
      })
      .then(() => {
        grabQuestions();
      })
      .catch((error) => {
        console.log('Error marking as helpful', error);
      });
    // setHelpButton(!helpButton);
  };

  const questionReport = (e) => {
    e.preventDefault();
    axios.put('/qa/questions/report', { question_id: quest.question_id })
      .then((result) => {
        setReportQuest(!reportQuest);
        // console.log('Successfully reported question');
      })
      .then(() => {
        grabQuestions();
      })
      .catch((err) => {
        console.log('Error reporting:', err);
      });
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
          <button onClick={questionReport} className="report-question-button" type="button" disabled={reportQuest}>Report</button>
          <button className="add-answer-button" type="button" onClick={addAnswerClicker}>Add Answer</button>
          <AddAnswer
            grabQuestions={grabQuestions}
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
        <div className="answer-list">
          {Object.keys(quest.answers).slice(0, ansEntry).map((key) => (
            <AnswerListEntry key={key} answer={quest.answers[key]} grabQuestions={grabQuestions} />
          ))}
        </div>
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
