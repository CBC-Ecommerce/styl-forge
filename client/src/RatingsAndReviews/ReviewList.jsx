import React, { useState, useEffect } from 'react';
import ReviewListCard from './ReviewListCard.jsx';
import './css/ReviewList.css';

export default function ReviewList({ currentList, listCount }) {
  const [renderList, setRenderList] = useState([]);

  useEffect(() => {
    const reviewsVisible = currentList.slice(0, listCount);
    setRenderList(reviewsVisible);
  }, [listCount]);

  useEffect(() => {
    setRenderList(currentList.slice(0, listCount));
  }, [currentList]);

  return (
    <div className="review-list">
      {renderList.length === 0 && <div>This product has no reviews yet</div>}
      {renderList.map((rev) => (
        <ReviewListCard review={rev} key={rev.review_id} />
      ))}
    </div>
  );
}
