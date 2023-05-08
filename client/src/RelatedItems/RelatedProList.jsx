import React, { useState } from 'react';
import Card from './Card.jsx';

function RelatedProList({ relatedIdList }) {
  return (
    <div>
      {relatedIdList.map((id) => <Card id={id} key={id} />)}
    </div>
  );
}

export default RelatedProList;
