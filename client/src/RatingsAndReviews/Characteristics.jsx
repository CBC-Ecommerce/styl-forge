import React from 'react';
import ProductFactor from './ProductFactor.jsx';

export default function Characteristics({characteristics}) {
  const charsAvailable = Object.keys(characteristics);
  return (
    <div>
      {charsAvailable.map((factor) => (
        <ProductFactor factor={factor} avg={characteristics[factor].value} key={characteristics[factor].id} />
      ))}
    </div>
  );
}
