import React from 'react';
import ReviewListCard from './ReviewListCard.jsx';
import './css/ReviewList.css';

// reviewList prop is an array of objects
export default function ReviewList({ reviewList }) {
  return (
    <div className="review-list">
      { reviewList.map((review) => (
        <ReviewListCard review={review} key={review.review_id} />
      )) }
    </div>
  );
}
