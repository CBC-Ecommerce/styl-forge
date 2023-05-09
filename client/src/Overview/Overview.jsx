import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './Title.jsx';
import Price from './Price.jsx';
import Category from './Category.jsx';
import ProductOverview from './ProductOverview.jsx';
import Social from './Social.jsx';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';
import StyleSelector from './StyleSelector.jsx'

export default function Overview({ product, id }) {
  const [styles, setStyles] = useState(0);

  // get style information for selector
  useEffect(() => {
    axios.get(`products/?product_id=${id}/styles`)
      .then((result) => {
        console.log('style data', result.data);
        setStyles(result.data);
      })
      .catch((err) => { throw err; });
  }, []);

  return (
    <div id="Overview">
      <Stars ratingInt={2.5} />
      {/* conditionally render link to reviews if they exist here */}
      <Category name={product.category} />
      <Title name={product.name} />
      <Price price={product.default_price}/>
      {styles && <StyleSelector styles={styles} />}
      {product.description && <ProductOverview description={product.description} />}
      <Social />
    </div>
  );
}
