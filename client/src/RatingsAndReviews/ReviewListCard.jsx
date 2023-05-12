/* eslint-disable import/extensions */
import React from 'react';
import dateFormat from 'dateformat';
import StaticStarList from './StaticStarList.jsx';
import ReviewCardBody from './ReviewCardBody.jsx';
import ReviewPicture from './ReviewPicture.jsx';
import Helpfullness from './Helpfullness.jsx';

export default function ReviewListCard({ review }) {
  if (review.response) {
    var responseNoQuotes = review.response.slice(1, review.response.length - 2);
  }
  return (
    <div className="review-card" data-testid="card">

      <div className="card-top-row">
        <StaticStarList ratingInt={review.rating} />
        <div className="name-date">
          <div className="reviewer-name">{`${review.reviewer_name} |`}</div>
          <div className="review-date">{dateFormat(review.date, 'mmmm dS, yyyy')}</div>
        </div>
      </div>

      {review.summary.length > 60 && (
        <div className="summary-title">
          <strong>{`${review.summary.substring(0, 60)}...`}</strong>
          <br />
          <small>{`...${review.summary.substring(60)}`}</small>
        </div>
      )}

      {review.summary.length < 60 && <div className="summary-title"><strong>{review.summary}</strong></div>}

      {review.body.length <= 250 && (
        <ReviewCardBody short={true} body={review.body} pics={review.photos} />
      )}
      {review.body.length > 250 && (
        <ReviewCardBody short={false} body={review.body} />
      )}

      <div className="review-thumbnail-container">
        {review.photos.map((pic) => (<ReviewPicture src={pic.url} key={pic.id} />))}
      </div>

      {review.recommend && (
        <div className="recommended">
          <span className="fa-solid fa-check" />
          I recommend this product
        </div>
      )}

      {review.response && (
        <div className="response">
          <strong>Response:</strong>
          <br />
          {responseNoQuotes}
        </div>
      )}

      <Helpfullness review_id={review.review_id} helpful={review.helpfulness}/>

    </div>
  );
}