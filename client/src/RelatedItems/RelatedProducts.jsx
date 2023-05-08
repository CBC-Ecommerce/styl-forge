import React, { useState, useEffect } from 'react';
import RelatedProList from './RelatedProList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const axios = require('axios');

function RelatedProducts({ id }) {
  const [relatedIdList, setRelatedIdList] = useState([]);

  function getRelatedList(currentId) {
    axios.get('/products/related', { params: { product_id: currentId } })
      .then((res) => setRelatedIdList(res.data))
      .catch((err) => {
        throw new Error(err, 'Failed to get related product list');
      });
  }

  useEffect(() => {
    getRelatedList(id);
  }, []);

  return (
    <section>
      <h4>RELATED PRODUCTS</h4>
      <RelatedProList relatedIdList={relatedIdList} />
      <h4>YOUR OUTFITS</h4>
      <YourOutfitList />
    </section>
  );
}

export default RelatedProducts;
