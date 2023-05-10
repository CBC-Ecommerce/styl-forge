import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProList from './RelatedProList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

function RelatedProducts({ id, setId }) {
  const [relatedIdList, setRelatedIdList] = useState([]);

  function getRelatedList(currentId) {
    axios.get(`products/?product_id=${currentId}/related`)
      .then((res) => {
        setRelatedIdList(res.data);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get related product list');
      });
  }

  useEffect(() => {
    getRelatedList(id);
  }, [id]);

  return (
    <section>
      <h4>RELATED PRODUCTS</h4>
      <RelatedProList relatedIdList={relatedIdList} setId={setId} />
      <h4>YOUR OUTFITS</h4>
      <YourOutfitList id={id} setId={setId} />
    </section>
  );
}

export default RelatedProducts;
