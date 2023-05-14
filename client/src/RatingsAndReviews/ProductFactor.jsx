import React from 'react';

export default function ProductFactor({factor, avg}) {
  let desc1;
  let desc2;
  let desc3;
  if (factor === 'Fit') {
    desc1 = 'Runs Tight';
    desc2 = 'Perfect';
    desc3 = 'Runs Loose';
  } else if (factor === 'Length') {
    desc1 = 'Runs Short';
    desc2 = 'Perfect';
    desc3 = 'Runs Long';
  } else if (factor === 'Comfort') {
    desc1 = 'Uncomfortable';
    desc2 = '';
    desc3 = 'Perfect';
  } else if (factor === 'Quality') {
    desc1 = 'Poor';
    desc2 = 'As Expected';
    desc3 = 'Perfect';
  } else if (factor === 'Size') {
    desc1 = 'Too Small';
    desc2 = 'Perfect';
    desc3 = 'Too Big';
  } else {
    desc1 = 'Too Narrow';
    desc2 = 'Perfect';
    desc3 = 'Too Wide';
  }

  const iconPlacement = Math.round((avg / 5) * 100);
  console.log('AVERAGE ', avg);
  console.log('PERCENTAGE ', iconPlacement);
  const iconStyle = {
    left: `${iconPlacement}%`,
  };

  return (
    <div className="product-factor-container">
      <div className="factor-name">{factor}</div>
      <div className="pf-icon-row">
        <span className="fa-solid fa-caret-down" style={iconStyle} />
      </div>
      <div className="product-factor-row">
        <div className="pf-col1" />
        <div className="pf-col2" />
        <div className="pf-col3" />
      </div>
      <div className="product-factor-row2">
        <div className="pf-descrip-col1">{desc1}</div>
        <div className="pf-descrip-col2">{desc2}</div>
        <div className="pf-descrip-col3">{desc3}</div>
      </div>
    </div>
  );
}
