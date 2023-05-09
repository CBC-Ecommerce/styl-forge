import React from 'react';
import StaticStarList from './StaticStarList.jsx';
import dateFormat from 'dateformat';
import ReviewCardBody from './ReviewCardBody.jsx';
// Each review has the following properties to access:
// review_id, rating, summary, recommended, response, body, date, reviewer_name,
// helpfullness, and photos (array)
export default function ReviewListCard({ review }) {
  console.log(review.photos);
  return (
    <div className="review-card" data-testid="card">
      <StaticStarList ratingInt={review.rating} />

      <div className="review-date">{dateFormat(review.date, "mmmm dS, yyyy")}</div>

      {review.summary.length > 60 && <div className="summary-title">
        <strong>{`${review.summary.substring(0, 60)}...`}</strong><br />
        <small>{`...${review.summary.substring(60)}`}</small></div>}
      {review.summary.length < 60 && <div className="summary-title"><strong>{review.summary}</strong></div>}

      {review.body.length <= 250 && <ReviewCardBody short={true} body={review.body} pics={review.photos} />}
      {review.body.length > 250 && <ReviewCardBody short={false} body={review.body} pics={review.photos} />}

      {/* <div>REcommended</div>
      <div>Reviewer Name</div>
      <div>REsponse to Review</div>
      <div>Rating Helpfullness</div> */}
    </div>
  );
}
