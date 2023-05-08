import React, { useState } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import QnA from './QnA/QnA.jsx';
import StaticStarList from './RatingsAndReviews/StaticStarList.jsx';

function App() {
  const [id, setId] = useState(40347);

  return (
    <div data-testid="app">
      Hello world!
      <QnA id={id} />
      <RelatedProducts id={id} />
      <StaticStarList ratingInt={2.5} />
    </div>
  );
}

export default App;
