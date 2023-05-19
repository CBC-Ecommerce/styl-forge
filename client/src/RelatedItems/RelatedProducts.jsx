import React, { useEffect } from 'react';
import axios from 'axios';
import RelatedProList from './RelatedProList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import './css/RelatedItems.css';

function RelatedProducts({ id, setId }) {
  const [relatedIdList, setRelatedIdList] = React.useState([]);

  function getRelatedList(currentId) {
    axios.get(`products/?product_id=${currentId}/related`)
      ?.then((res) => {
        const idSet = new Set(res.data);
        if (idSet) setRelatedIdList([...idSet]);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get related product list');
      });
  }

  useEffect(() => {
    getRelatedList(id);
  }, [id]);

  return (
    <section className="related-products">
      <h4 className="related-heading">RELATED PRODUCTS</h4>
      <RelatedProList relatedIdList={relatedIdList} setId={setId} id={id} />
      <h4 className="related-heading">YOUR OUTFITS</h4>
      <YourOutfitList id={id} setId={setId} />
    </section>
  );
}

export default RelatedProducts;
