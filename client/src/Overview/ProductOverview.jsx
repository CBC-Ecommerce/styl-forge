import React from 'react';

export default function ProductOverview({ slogan, description, features }) {
  return (
    <div className="product-overview">
      <div className="description">
        <h3 className="product-slogan">{slogan}</h3>
        <p>{description}</p>
      </div>
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature">
            <i className="fa-solid fa-check" />
            <div>{feature.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
