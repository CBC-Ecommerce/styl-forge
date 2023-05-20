import React, { useState } from 'react';

export default function ReviewCardBody({short, body}) {
  const [showingMore, setShowingMore] = useState(false);
  if (short) {
    return (
      <div className="review-body">
        {body}
      </div>
    );
  }
  return (
    <div className="review-body">
      {showingMore ? body : `${body.substring(0, 250)}...`}
      <button
        className="show-more-btn"
        type="button"
        aria-label="Show More Review Text"
        onClick={(e) => { e.preventDefault(); setShowingMore(!showingMore); }}
      >
        {showingMore ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
}
