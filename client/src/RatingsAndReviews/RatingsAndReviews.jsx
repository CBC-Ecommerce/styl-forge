import React, { useEffect } from 'react';
import StaticStarList from './StaticStarList.jsx';
import ReviewList from './ReviewList.jsx';
import './css/MainContainer.css';

export default function RatingsAndReviews({id, reviewList}) {
  // Pass to Review List, which will render 2 reviews at a time
  // Need to use React.useState for testing purposes so that Jest can spyon this state
  const [listCount, setListCount] = React.useState(2);

  function increaseReviewsSeen() {
    setListCount(listCount + 2);
  }

  return (
    <div className="main-container" data-testid="rr-main">
      <h4>Ratings & Reviews</h4>
      <div className="row">
        <div className="column1">
          <div className="green-col">
            Imagine a Big Number
            <StaticStarList productId={id} />
            Now Imagine a Graph
            And then some other bar guy for Characteristics
          </div>
        </div>
        <div className="column2">
          <div className="blue-col">
            #of Reviews and Dropdown Menu
            <ReviewList reviewList={reviewList} listCount={listCount} setListCount={setListCount} />
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
