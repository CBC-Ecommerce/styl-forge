import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import StaticStarList from './RatingsAndReviews/StaticStarList.jsx';
import Overview from './Overview/Overview.jsx';

function App() {
  const [id, setId] = useState(40344);
  const [currentProduct, setCurrentProduct] = useState({});

  // useEffect gets new product information when id changes
  useEffect(() => {
    // get product information
    axios.get(`/products/?product_id=${id}`)
      .then((results) => { setCurrentProduct(results.data); })
      .catch((err) => { throw err; });
  }, [id]);

  return (
    <div data-testid="app">
      Hello world!
      <Overview product={currentProduct} id={id} /* rating={avgRating} */ />
      <RelatedProducts id={id} />
      <StaticStarList ratingInt={2.5} />
    </div>
  );
}

export default App;
