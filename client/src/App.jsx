/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import QnA from './QnA/QnA.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import Overview from './Overview/Overview.jsx';
import ProductOverview from './Overview/ProductOverview.jsx';
import Social from './Overview/Social.jsx';

function App() {
  const [id, setId] = useState(40346); // Better product id for testing QnA.
  const [currentProduct, setCurrentProduct] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [characteristics, setCharacteristics] = useState({});

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
    // set a list of characteristics
    axios.get(`/reviews/meta?product_id=${id}`)
      .then((results) => { setCharacteristics(results.data.characteristics); })
      .catch((err) => { throw err; });
  }, [id]);
  return (
    <div data-testid="app">
      <Overview product={currentProduct} id={id} reviewList={reviewList} />
      <div className="product-overview-box">
        {currentProduct.description && (
          <>
            <ProductOverview
              slogan={currentProduct.slogan}
              description={currentProduct.description}
              features={currentProduct.features}
            />
            <Social id={id} />
          </>
        )}
      </div>
      {/* <RelatedProducts id={id} setId={setId} /> */}
      <QnA id={id} product={currentProduct} />
      <RatingsAndReviews id={id} reviewList={reviewList} char={characteristics} />
    </div>
  );
}

export default App;
