import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import StaticStarList from './RatingsAndReviews/StaticStarList.jsx';
import ReviewList from './RatingsAndReviews/ReviewList.jsx';

function App() {
  const [id, setId] = useState(40347);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    // Every time main product id changes, reset the reviews list
    axios.get(`/reviews?product_id=${id}&page=11`)
      .then((results) => { setReviewList(results.data.results); })
      .catch((err) => { throw err; });
  }, [id]);

  return (
    <div data-testid="app">
      Hello world!
      <RelatedProducts id={id} />
      <ReviewList reviewList={reviewList} />
    </div>
  );
}

export default App;
