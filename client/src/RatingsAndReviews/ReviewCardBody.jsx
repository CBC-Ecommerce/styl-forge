import React, { useState } from 'react';
import ReviewPicture from './ReviewPicture.jsx';

export default function ReviewCardBody({short, body, pics}) {
  const [showingMore, setShowingMore] = useState(false);
  if (short) {
    return (
      <div className="review-body">
        {body}
        <div className="review-thumbnail-container">
          {pics.map((pic) => (<ReviewPicture src={pic.url} id={pic.id} />))}
        </div>
      </div>
    );
  }
  return (
    <div className="review-body">
      {showingMore ? body : `${body.substring(0, 250)}...`}
      <button
        className="show-more-btn"
        type="button"
        onClick={(e) => { e.preventDefault(); setShowingMore(!showingMore); }}
      >
        {showingMore ? 'Show Less' : 'Show More'}
      </button>
      <div className="review-thumbnail-container">
        {pics.map((pic) => (<ReviewPicture src={pic.url} id={pic.id} />))}
      </div>
    </div>
  );
}
