import React from 'react';
import QnAListEntry from './QnAListEntry.jsx';

function QnAList({quests}) {
  return (
    <div>
      {quests.map((quest) => <QnAListEntry quest={quest} key={quest.question_id}/>)}
    </div>

  );
}

export default QnAList;
