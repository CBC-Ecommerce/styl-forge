import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

function RelatedProList({ relatedIdList, setId, id }) {
  const [related, setRelated] = useState(true);
  return (
    <div className="cardContainer">
      <Carousel id={id} setId={setId} idList={relatedIdList} related={related} />
    </div>
  );
}

export default RelatedProList;
