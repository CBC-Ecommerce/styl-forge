import React, { useState, useEffect } from 'react';

function AnswerListEntry({ answer }) {
  return (
    <div>
      <div>{answer.body}</div>
      <div>
        Helpful?
        {' '}
        <button type="submit">
          Yes
          {' '}
          (
          {answer.helpfulness}
          )
        </button>
      </div>
    </div>
  );
}

export default AnswerListEntry;
