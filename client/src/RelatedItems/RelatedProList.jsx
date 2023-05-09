import React, { useState } from 'react';
import Card from './Card.jsx';

function RelatedProList({ relatedIdList, setId }) {
  return (
    <div>
      {relatedIdList.map((id) => <Card id={id} key={id} setId={setId} />)}
    </div>
  );
}

export default RelatedProList;
