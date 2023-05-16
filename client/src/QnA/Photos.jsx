import React, { useState, useEffect } from 'react';

function Photos({ photo }) {
  if (!photo) {
    return null;
  }

  return (
    <div>
      <img className="answer-photo" src={photo} />
    </div>
  );
}

export default Photos;
