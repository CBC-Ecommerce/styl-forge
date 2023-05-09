import React, { useState, useEffect } from 'react';

function AnswerListEntry({ answer }) {
  const date = new Date(answer.date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',

  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div>
      <div>{answer.body}</div>
      <span>
        by
        {' '}
        {answer.answerer_name}
        {' '}
        {formattedDate}
        {' '}
        Helpful?
        {' '}
        <button type="button">
          Yes
          {' '}
          (
          {answer.helpfulness}
          )
        </button>
        <button type="button">
          {' '}
          Report
        </button>
      </span>
    </div>
  );
}

export default AnswerListEntry;
