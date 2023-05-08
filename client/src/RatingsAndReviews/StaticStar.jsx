import React from 'react';
import './StaticStar.css';

export default function StaticStar({ value }) {
  let style;
  if (value === 1) {
    style = 'whole-star';
  } else if (value > 0 && value <= 0.4) {
    style = 'quarter-star';
  } else if (value > 0.4 && value <= 0.6) {
    style = 'star half-star';
  } else if (value > 0.6) {
    style = 'three-quarter-star';
  } else {
    style = 'empty-star';
  }

  return (
    <span className={`fa-solid fa-star ${style}`} />
  );
}
