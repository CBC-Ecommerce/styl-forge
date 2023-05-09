import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import StaticStarList from './RatingsAndReviews/StaticStarList.jsx';

function App() {
  const [id, setId] = useState(40345);

  useEffect(() => {
  }, [id]);

  return (
    <div data-testid="app">
      Hello world!
      <RelatedProducts id={id} setId={setId} />
      <StaticStarList ratingInt={2.5} />
    </div>
  );
}

export default App;
