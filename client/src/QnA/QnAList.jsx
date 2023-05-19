import React, { useState, useEffect } from 'react';
import QnAListEntry from './QnAListEntry.jsx';
import './style/QnAList.css';

function QnAList({ quests, product, grabQuestions }) {
  const [numEntry, setNumEntry] = useState(2);
  const [questButton, setQuestButton] = useState(false);
  const moreQuestHandler = (e) => {
    e.preventDefault();
    setNumEntry(numEntry + 2);
    if (numEntry >= quests.length - 1) {
      setQuestButton(true);
    }
  };
  const allQuestionHandler = () => {
    setNumEntry(quests.length);
    setQuestButton(true);
  };

  return (
    <div className="QnAList-Component">
      <div className="QnA-List-map" data-testid="QnAList Test">
        {quests.slice(0, numEntry).map((quest) => (
          <QnAListEntry
            quest={quest}
            key={quest.question_id}
            product={product}
            grabQuestions={grabQuestions}
          />
        ))}
      </div>
      <div className="QnAList-buttons" data-testid="question-buttons">
        {questButton ? null : (
          <button className="show-more-button" type="button" onClick={moreQuestHandler}>
            Show More Answered Questions
          </button>
        )}
        {questButton ? null : (
          <button className="show-more-button" type="button" onClick={allQuestionHandler}>
            Show All Questions
          </button>
        )}
      </div>
    </div>
  );
}

export default QnAList;
