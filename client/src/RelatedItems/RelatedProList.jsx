import React from 'react';
import Carousel from './Carousel.jsx';

function RelatedProList({ relatedIdList, setId, id }) {
  const [related, setRelated] = React.useState(true);
  return (
    <div className="container">
      <div className="cardContainer">
        <Carousel id={id} setId={setId} idList={relatedIdList} related={related} />
      </div>
    </div>
  );
}

export default RelatedProList;
