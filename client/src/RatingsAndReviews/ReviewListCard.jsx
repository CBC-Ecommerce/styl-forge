import React from 'react';

// Each review has the following properties to access:
// review_id, rating, summary, recommended, response, body, date, reviewer_name,
// helpfullness, and photos (array)
export default function ReviewListCard({ review }) {
  return (
    <div>
      <div>Star Rating</div>
      <div>{review.date}</div>
      <div>Review Summary</div>
      <div>Review Body</div>
      <div>REcommended</div>
      <div>Reviewer Name</div>
      <div>REsponse to Review</div>
      <div>Rating Helpfullness</div>
    </div>
  );
}
