import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './Title.jsx';
import Price from './Price.jsx';
import Category from './Category.jsx';
import ProductOverview from './ProductOverview.jsx';
import Social from './Social.jsx';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';

export default function Overview({ product }) {
  console.log(product);
  return (
    <div id="Overview">
      <Stars ratingInt={4.75} />
      <Category name={product.category} />
      <Title name={product.name} />
      <Price price={product.default_price}/>
      {product.description && <ProductOverview description={product.description} /> }
      <Social />
    </div>
  );
}
