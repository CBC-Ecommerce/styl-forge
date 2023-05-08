import React, { useState } from 'react';

const axios = require('axios');

function RelatedProList({ relatedIdList }) {

  function getProductInfo(id) {
    axios.get('/products', { params: { product_id: id } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function getPriceImage(id) {
    axios.get('/products/styles', { params: { product_id: id } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  return (
    <div>related product list here</div>
  );
}

export default RelatedProList;
