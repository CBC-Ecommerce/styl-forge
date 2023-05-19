import React from 'react';
import axios from 'axios';
import QnAList from './QnAList.jsx';
import AddQuestion from './AddQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import './style/QnA.css';

const { useState, useEffect } = React;

function QnA({ id, product }) {
  const [quests, setQuests] = useState([]);
  const [filtQuests, setFiltQuests] = useState(quests);
  const [picsOnly, setPicsOnly] = useState(filtQuests);
  const [questModal, setQuestModal] = useState(false);
  const [picMode, SetPicMode] = useState(false);

  const grabQuestions = () => {
    // console.log('grabQuestions is invoked');
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
    setFiltQuests(filtered);
  };

  const filterObjectsWithDataContainingPhotos = (data) => {
    if (!picMode) {
      const filteredObjects = [];
      data.forEach((result) => {
        const answerKeys = Object.keys(result.answers);
        const hasPhotos = answerKeys.some(
          (key) => result.answers[key].photos.length > 0,
        );
        if (hasPhotos) {
          filteredObjects.push(result);
        }
      });
      setPicsOnly(filteredObjects);
    } else {
      setPicsOnly(filtQuests);
    }
  };

  const picOnlyClicker = () => {
    filterObjectsWithDataContainingPhotos(filtQuests);
    SetPicMode(!picMode);
  };

  // useEffect(() => {
  //   grabQuestions();
  // }, []);
  // Need to render change in selection from related products
  useEffect(() => {
    grabQuestions();
  }, [id]);

  useEffect(() => {
    setFiltQuests(quests);
  }, [quests]);

  useEffect(() => {
    setPicsOnly(filtQuests);
  }, [filtQuests]);

  return (

    <div className="QnA-Component" data-testid="QnA Test">
      <div className="QnA-Widget-Title">Questions and Answers</div>
      <div className="QnA-Options">
        <div className="QnA-Search-Questions">
          <SearchQuestions quests={quests} filterQuestion={filterQuestion} />
        </div>
        <div className="QnA-Buttons">
          <div className="QnA-Pic-Answers">
            <button type="button" className="QnA-OnlyPics" onClick={picOnlyClicker}>{picMode ? 'Pic Mode Off' : 'OnlyPics'}</button>
          </div>
          <div className="QnA-Add-Question">
            <button className="QnA-Add-Question-Button" type="button" onClick={questModalClicker}>
              Add Your Own Question
              {' '}
              <span id="plus-sign">+</span>
            </button>
            {questModal ? (
              <AddQuestion
                product={product}
                grabQuestions={grabQuestions}
                questModalClicker={questModalClicker}
              />
            ) : null }
          </div>
        </div>
      </div>
      <div className="QnA-List">
        <QnAList quests={picsOnly} product={product} grabQuestions={grabQuestions} />
      </div>
    </div>
  );
}

export default QnA;
