/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import StaticStarList from './StaticStarList.jsx';
import ReviewList from './ReviewList.jsx';
import DropDownFilter from './DropDownFilter.jsx';
import './css/MainContainer.css';
import './css/RatingSummary.css';

export default function RatingsAndReviews({id, reviewList, changeList}) {
  // Pass to Review List, which will render 2 reviews at a time
  // Need to use React.useState for testing purposes so that Jest can spyon this state
  const [listCount, setListCount] = useState(2);
  const [ratingReturnVal, setRatingReturnVal] = React.useState(0);
  const [recommendPercent, setRecommendPercent] = useState(0);

  function increaseReviewsSeen() {
    setListCount(listCount + 2);
  }

  function returnAvgRating(avgRating) {
    setRatingReturnVal(avgRating);
  }

  function resetCount(count) {
    setListCount(count);
  }

  useEffect(() => {
    const sumOfReviews = reviewList.length;
    const numOfRecommend = reviewList.reduce((accum, review) => (
      review.recommend ? accum + 1 : accum + 0
    ), 0);
    console.log('Number of recommended ', numOfRecommend);
    const recommended = Math.floor((numOfRecommend / sumOfReviews) * 100);
    setRecommendPercent(recommended);
  }, [reviewList]);

  return (
    <div className="main-container" data-testid="rr-main">
      <h4>Ratings & Reviews</h4>
      <div className="row">
        <div className="column1">
          <div className="green-col">
            <div className="rating-summary">
              <div className="large-rating-number">{ratingReturnVal}</div>
              <StaticStarList productId={id} returnAvgRating={returnAvgRating} />
            </div>
            <div className="percent">{`${recommendPercent}% of reviews recommend this product`}</div>
            Now Imagine a Graph
            And then some other bar guy for Characteristics
          </div>
        </div>
        <div className="column2">
          <div className="blue-col">
            <DropDownFilter reviewList={reviewList} changeList={changeList} />
            <ReviewList reviewList={reviewList} listCount={listCount} resetCount={resetCount} />
            <div className="review-list-buttons">
              <button
                type="button"
                className="more-reviews"
                onClick={increaseReviewsSeen}
              >
                More Reviews
              </button>
              <button type="button" className="add-review">Add Review +</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
