import React from 'react';

export default function Feature({ feature }) {
  return (
    <div className="feature">
      <i className="fa-solid fa-check" />
      <div>{feature.value}</div>
    </div>
  );
}
