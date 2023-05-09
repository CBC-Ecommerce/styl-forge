import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerListEntry from './AnswerListEntry.jsx';

function QnAListEntry({ quest }) {
  console.log('This is quest:', quest);
  const [answers, setAnswers] = useState([]);
  const [ansEntry, setAnsEntry] = useState(2);
  const [anyMore, setAnyMore] = useState(false);
  const grabAnswers = () => {
    axios(`/qa/questions/${quest.question_id}/answers?page=1&count=9999`)
      .then((info) => {
        setAnswers(info.data.results);
        // This also works instead of the useEffect for answers.length
        // if (info.data.results.length <= 2) {
        //   setAnyMore(false);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    grabAnswers();
  }, []);

  useEffect(() => {
    console.log(answers);
    if (answers.length > 2) {
      setAnyMore(true);
    }
  }, [answers]);

  const submitHandler = (e) => {
    e.preventDefault();
    setAnsEntry(answers.length);
    setAnyMore(false);
  };

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
