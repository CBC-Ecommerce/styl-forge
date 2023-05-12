import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import QnA from './QnA/QnA.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import Overview from './Overview/Overview.jsx';
import ProductOverview from './Overview/ProductOverview.jsx';
import Social from './Overview/Social.jsx';

function App() {
  const [id, setId] = useState(40344); // Better product id for testing QnA.
  const [currentProduct, setCurrentProduct] = useState({});
  const [reviewList, setReviewList] = useState([]);

  // useEffect gets new product information when id changes
  useEffect(() => {
    // get product information
    axios.get(`/products/?product_id=${id}`)
      .then((results) => { setCurrentProduct(results.data); })
      .catch((err) => { throw err; });
    // Every time main product id changes, reset the reviews list
    axios.get(`/reviews?product_id=${id}&count=9999`)
      .then((results) => { setReviewList(results.data.results); })
      .catch((err) => { throw err; });
  }, [id]);

  return (
    <div data-testid="app">
      <Overview product={currentProduct} id={id} />
      <div className="product-overview-box">
        {currentProduct.description && <ProductOverview description={currentProduct.description} />}
        <Social />
      </div>
      <RelatedProducts id={id} setId={setId} />
      <QnA id={id} product={currentProduct} />
      <RatingsAndReviews id={id} reviewList={reviewList} />
    </div>
  );
}

export default App;
