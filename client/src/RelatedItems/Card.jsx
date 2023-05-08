import React, { useState, useEffect } from 'react';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';

const axios = require('axios');

function Card({ id }) {
  const [productInfo, setproductInfo] = useState({});
  const [stylesInfo, setStylesInfo] = useState({});

  function getProductInfo(productId) {
    axios.get('/products', { params: { product_id: productId } })
      .then((res) => {
        setproductInfo({ name: res.data.name, category: res.data.category });
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function getPriceImage(productId) {
    axios.get('/products/styles', { params: { product_id: productId } })
      .then((res) => {
        let index = 0;
        res.data.results.forEach((el, i) => {
          if (el['default?']) {
            index = i;
          }
        });
        const updates = {
          originalPrice: res.data.results[index].original_price,
          salePrice: res.data.results[index].sale_price,
          photoURL: res.data.results[index].photos[0].url,
        };
        setStylesInfo(updates);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  useEffect(() => {
    getProductInfo(id);
    getPriceImage(id);
  }, []);

  return (
    <div>
      <img src={stylesInfo.photoURL ? stylesInfo.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" />
      <span>{productInfo.category}</span>
      <span>
        {stylesInfo.salePrice === null
          ? stylesInfo.originalPrice : stylesInfo.salePrice + stylesInfo.originalPrice}
      </span>
      <Stars id={id} />
    </div>
  );
}

export default Card;
