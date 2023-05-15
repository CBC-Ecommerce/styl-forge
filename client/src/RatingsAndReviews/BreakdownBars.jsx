import React from 'react';
import './css/RatingSummary.css';

export default function BreakdownBars({bar, rating, qty}) {
  const col1 = {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: `${bar[0]}%`,
    backgroundColor: '#525252',
    marginLeft: '10px',
    height: '10px',
  };
  const col2 = {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: `${bar[1]}%`,
    backgroundColor: '#EBEBEB',
    marginRight: '10px',
    height: '10px',
  };

  return (
    <div className="rating-bar">
      <div className="bar-label">{`${rating} stars`}</div>
      <div className="rating-qty">{`(${qty})`}</div>
      <div className="bar-row">
        <div style={col1} />
        <div style={col2} />
      </div>
    </div>
  );
}
