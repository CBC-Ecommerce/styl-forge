import React from 'react';
import ReviewListCard from './ReviewListCard.jsx';

// reviewList prop is an array of objects
export default function ReviewList({ reviewList }) {
  console.log('These are how many reviews we have: ', reviewList.length);
  return (
    <div className="review-list">
      { reviewList.map((review) => (<ReviewListCard review={review} key={review.review_id} />)) }
    </div>
  );
}