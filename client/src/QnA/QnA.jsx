import React from 'react';
import axios from 'axios';
import QnAList from './QnAList.jsx';
import AddQuestion from './AddQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';

const { useState, useEffect } = React;

function QnA({ id, product }) {
  const [quests, setQuests] = useState([]);
  const [filtQuests, setFiltQuests] = useState(quests);
  const [questModal, setQuestModal] = useState(false);

  const grabQuestions = () => {
    const config = { params: { product_id: id, page: 1, count: 99999 } };
    axios.get('/qa/questions', config)
      .then((response) => {
        setQuests(response.data.results);
      })
      .catch((error) => {
        console.log('Error grabbing questions', error);
      });
  };

  const questModalClicker = () => {
    setQuestModal(!questModal);
  };

  const filterQuestion = (input) => {
    const filtered = quests.filter((quest) => quest.question_body.toLowerCase()
      .includes(input.toLowerCase()));
    // Promise.all(filtered)
    //   .then((result) => {
    //     setFiltQuests(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setFiltQuests(filtered);
  };

  useEffect(() => {
    grabQuestions();
  }, []);
  // Need to render change in selection from related products
  useEffect(() => {
    grabQuestions();
  }, [id]);

  useEffect(() => {
    setFiltQuests(quests);
  }, [quests]);

  return (

    <div className="QnA div" data-testid="QnA Test">
      <div className="QnA-Widget-Title">Questions and Answers</div>
      <div className="QnA-Search-Questions">
        <SearchQuestions quests={quests} filterQuestion={filterQuestion} />
      </div>
      <div className="QnA-Add-Question">
        <button type="button" onClick={questModalClicker}>Add Question</button>
        {questModal ? (
          <AddQuestion
            product={product}
            grabQuestions={grabQuestions}
            questModalClicker={questModalClicker}
          />
        ) : null }
      </div>
      <div className="QnA-List">
        <QnAList quests={filtQuests} product={product} grabQuestions={grabQuestions} />
      </div>
    </div>
  );
}

export default QnA;
