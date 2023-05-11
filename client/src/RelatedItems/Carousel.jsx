import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

function Carousel() {
  const [productInfo, setproductInfo] = useState({});
  const [stylesInfo, setStylesInfo] = useState({});

  function getProductInfo(productId) {
    axios.get(`products/?product_id=${productId}`)
      .then((res) => {
        setproductInfo(
          { name: res.data.name, category: res.data.category, features: res.data.features },
        );
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function getPriceImage(productId) {
    axios.get(`products/?product_id=${productId}/styles`)
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
    getProductInfo(compareId);
    getPriceImage(compareId);
  }, []);
}
