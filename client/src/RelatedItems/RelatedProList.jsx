import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

function RelatedProList({ relatedIdList, setId, id }) {
  const [related, setRelated] = useState(true);
  return (
    <div className="cardContainer">
      {relatedIdList.map(
        (relatedId) => (
          <Card
            compareId={relatedId}
            key={relatedId}
            setId={setId}
            related={related}
            id={id}
          />
        ),
      )}
    </div>
  );
}

export default RelatedProList;
