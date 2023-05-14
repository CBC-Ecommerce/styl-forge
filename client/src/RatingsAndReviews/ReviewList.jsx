import React, { useState, useEffect } from 'react';
import ReviewListCard from './ReviewListCard.jsx';
import './css/ReviewList.css';

export default function ReviewList({ reviewList, listCount, setListCount }) {
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    const reviews = reviewList.slice(0, listCount);
    setCurrentList(reviews);
  }, [listCount]);

  useEffect(() => {
    // upon receiving a new reviewList, should render a new set of only 2
    setCurrentList([]);
    setListCount(2);
  }, [reviewList]);

  return (
    <div className="review-list">
      {currentList.length === 0 && reviewList.slice(0, listCount).map((rev) => (
        <ReviewListCard review={rev} key={rev.review_id} />
      ))}
      {currentList.length > 0 && currentList.map((rev) => (
        <ReviewListCard review={rev} key={rev.review_id} />
      )) }
    </div>
  );
}
