import React from 'react';
import StaticStarList from './StaticStarList.jsx';
import ReviewList from './ReviewList.jsx';
import './css/MainContainer.css';

export default function RatingsAndReviews({id, reviewList}) {
  return (
    <div className="main-container">
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
            <ReviewList reviewList={reviewList} />
            <div className="review-list-buttons">
              <button type="button" className="more-reviews">More Reviews</button>
              <button type="button" className="add-review">Add Review +</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
