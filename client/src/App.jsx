import React, { useState } from 'react';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';

function App() {
  const [id, setId] = useState(1);
  return (
    <div>
      Hello world!
      <RelatedProducts id={id} />
    </div>
  );
}

export default App;
