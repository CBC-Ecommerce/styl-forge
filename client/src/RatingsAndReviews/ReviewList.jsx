import React from 'react';
import ReviewListCard from './ReviewListCard.jsx';
import './css/ReviewList.css';

export default function ReviewList({ reviewList }) {
  return (
    <div className="review-list">
      { reviewList.map((rev) => (
        <ReviewListCard review={rev} key={rev.review_id} />
      )) }
    </div>
  );
}
