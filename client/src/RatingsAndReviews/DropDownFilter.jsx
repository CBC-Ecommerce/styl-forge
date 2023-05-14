import React, { useState } from 'react';
import './css/DropDown.css';

export default function DropDownFilter({ reviewList, changeList }) {
  function changeFilter(event) {
    const { value } = event.target;
    if (value === 'helpful') {
      const helpful = reviewList.filter((review) => (review.helpfulness)).sort((a, b) => (b - a));
      changeList(helpful);
    } else if (value === 'newest') {
      const newest = reviewList.sort((a, b) => (new Date(b.date) - new Date(a.date)));
      changeList(newest);
    } else {
      console.log('Relevance!');
    }
  }
  return (
    <div className="filter-menu" onChange={changeFilter}>
      <div>{`${reviewList.length} reviews, sorted by: `}</div>
      <select className="dropdown-box">
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>
    </div>
  );
}
