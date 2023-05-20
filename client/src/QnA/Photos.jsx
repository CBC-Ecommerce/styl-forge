import React, { useState, useEffect } from 'react';

function Photos({ photo }) {
  if (!photo) {
    return null;
  }

  return (
    <div className="individual-photo" data-testid="photo-test">
      <img className="answer-photo" src={photo} alt="pic of clothing" />
    </div>
  );
}

export default Photos;
