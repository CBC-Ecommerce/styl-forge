import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import QnA from './QnA/QnA.jsx';
import StaticStarList from './RatingsAndReviews/StaticStarList.jsx';
import ReviewList from './RatingsAndReviews/ReviewList.jsx';
import Overview from './Overview/Overview.jsx';

function App() {
  const [id, setId] = useState(40347); // Better product id for testing QnA.
  const [currentProduct, setCurrentProduct] = useState({});
  const [reviewList, setReviewList] = useState([]);

  // useEffect gets new product information when id changes
  useEffect(() => {
    // get product information
    axios.get(`/products/?product_id=${id}`)
      .then((results) => { setCurrentProduct(results.data); })
      .catch((err) => { throw err; });
    // Every time main product id changes, reset the reviews list
    axios.get(`/reviews?product_id=${id}&page=11`)
      .then((results) => { setReviewList(results.data.results); })
      .catch((err) => { throw err; });
  }, [id]);

  return (
    <div data-testid="app">
      <Overview product={currentProduct} id={id} /* rating={avgRating} */ />
      <RelatedProducts id={id} setId={setId} />
      <QnA id={id} />
      <ReviewList reviewList={reviewList} />
    </div>
  );
}

export default App;
