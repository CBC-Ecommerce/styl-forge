import React, { useState, useEffect } from 'react';
import QnAListEntry from './QnAListEntry.jsx';

function QnAList({ quests }) {
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
    <div>
      {questButton ? null : (
        <form onSubmit={submitHandler}>
          <input type="submit" value="Show More Answered Questions" />
        </form>
      )}
      {quests.slice(0, numEntry)
        .map((quest) => <QnAListEntry quest={quest} key={quest.question_id} />)}
    </div>

  );
}

export default QnAList;
