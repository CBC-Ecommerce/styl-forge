/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import StaticStarList from './StaticStarList.jsx';
import ReviewList from './ReviewList.jsx';
import DropDownFilter from './DropDownFilter.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import Characteristics from './Characteristics.jsx';
import './css/MainContainer.css';
import './css/RatingSummary.css';

export default function RatingsAndReviews({id, reviewList, char}) {
  const [listCount, setListCount] = useState(2);
  const [ratingReturnVal, setRatingReturnVal] = React.useState(0);
  const [ratingsList, setRatingsList] = useState([]);
  const [recommendPercent, setRecommendPercent] = useState(0);
  const [currentList, setCurrentList] = useState([]);
  const [numReviews, setNumReviews] = useState(0);

  function increaseReviewsSeen() {
    setListCount(listCount + 2);
  }

  function returnAvgRating(avgRating) {
    setRatingReturnVal(avgRating);
  }

  function resetCount(count) {
    setListCount(count);
  }

  function changeList(list) {
    setCurrentList(list.slice());
    resetCount(2);
  }

  useEffect(() => {
    const sumOfReviews = reviewList.length;
    const numOfRecommend = reviewList.reduce((accum, review) => (
      review.recommend ? accum + 1 : accum + 0
    ), 0);
    const recommended = Math.floor((numOfRecommend / sumOfReviews) * 100);
    setRecommendPercent(recommended);

    const onlyRatings = reviewList.map((review) => (review.rating));
    setRatingsList(onlyRatings);

    resetCount(2);
    setCurrentList(reviewList.slice());

    setNumReviews(reviewList.length);
  }, [reviewList]);

  return (
    <div className="main-container" data-testid="rr-main">
      <h4>Ratings & Reviews</h4>
      <div className="row">
        <div className="column1">
          <div className="rating-summary">
            <div className="large-rating-number">{ratingReturnVal}</div>
            <StaticStarList productId={id} returnAvgRating={returnAvgRating} />
          </div>
          <div className="percent">{`${recommendPercent}% of reviews recommend this product`}</div>
          <RatingBreakdown ratingsList={ratingsList} />
          <Characteristics characteristics={char} />
        </div>
        <div className="column2">
          <DropDownFilter
            currentList={currentList}
            changeList={changeList}
            numReviews={numReviews}
          />
          <ReviewList currentList={currentList} listCount={listCount} />
          <div className="review-list-buttons">
            {reviewList.length > 2 && (
              <button
                type="button"
                className="more-reviews"
                onClick={increaseReviewsSeen}
              >
                More Reviews
              </button>
            )}
            <button type="button" className="add-review">Add Review +</button>
          </div>
        </div>
      </div>
    </div>
  );
}
