import React, { useState, useEffect } from 'react';
import QnAListEntry from './QnAListEntry.jsx';

function QnAList({ quests, product, grabQuestions }) {
  const [numEntry, setNumEntry] = useState(2);
  const [questButton, setQuestButton] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setNumEntry(numEntry + 2);
    if (numEntry >= quests.length - 1) {
      setQuestButton(true);
    }
  };
  return (
    <div data-testid="QnAList Test">
      {quests.slice(0, numEntry)
        .map((quest) => (
          <QnAListEntry
            quest={quest}
            key={quest.question_id}
            product={product}
            grabQuestions={grabQuestions}
          />
        ))}
      {questButton ? null : (
        <form onSubmit={submitHandler}>
          <input type="submit" value="Show More Answered Questions" />
        </form>
      )}
    </div>

  );
}

export default QnAList;
