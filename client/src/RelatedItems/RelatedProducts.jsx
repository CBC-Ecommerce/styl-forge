import React, { useState } from 'react';
import RelatedProList from './RelatedProList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

function RelatedProducts({ id }) {
  const [relatedIdList, setRelatedIdList] = useState([]);
  return (
    <section>
      <h4>RELATED PRODUCTS</h4>
      <RelatedProList />
      <h4>YOUR OUTFITS</h4>
      <YourOutfitList />
    </section>
  );
}

export default RelatedProducts;
