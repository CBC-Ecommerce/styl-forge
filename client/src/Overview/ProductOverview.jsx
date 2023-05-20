import React from 'react';
import Feature from './Feature.jsx';

export default function ProductOverview({ slogan, description, features }) {
  return (
    <div className="product-overview">
      <div className="description">
        <h3 className="product-slogan">{slogan}</h3>
        <p>{description}</p>
      </div>
      <div className="features">
        {features.map((feature) => (
          <Feature feature={feature} key={feature.value} />
        ))}
      </div>
    </div>
  );
}
