import React, { useState } from 'react';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import QnA from './QnA/QnA.jsx';

function App() {
  const [id, setId] = useState(1);
  return (
    <div>
      Hello world!
      <QnA id={id} />
      <RelatedProducts id={id} />
    </div>
  );
}

export default App;
