import React, { useState, useEffect } from 'react';

function AnswerListEntry({ answer }) {
  return (
    <div>{answer.body}</div>
  );
}

export default AnswerListEntry;
