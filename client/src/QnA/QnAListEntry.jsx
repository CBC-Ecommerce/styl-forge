import React from 'react';

function QnAListEntry({ quest }) {
  return (

    <div>
      Question:
      {' '}
      {quest.question_body}
    </div>
  );
}

export default QnAListEntry;
