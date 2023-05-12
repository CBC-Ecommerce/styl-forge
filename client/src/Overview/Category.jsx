import React from 'react';

export default function Category({ name }) {
  return (
    <div className="product-category">
      <span>{name}</span>
    </div>
  );
}
