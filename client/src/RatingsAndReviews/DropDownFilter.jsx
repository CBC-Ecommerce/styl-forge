import React, { useState } from 'react';
import './css/DropDown.css';

export default function DropDownFilter({ currentList, changeList, numReviews }) {
  function changeFilter(event) {
    const { value } = event.target;
    if (value === 'helpful') {
      const helpful = currentList.filter((review) => (review.helpfulness)).sort((a, b) => (b - a));
      changeList(helpful);
    } else if (value === 'newest') {
      const newest = currentList.sort((a, b) => (new Date(b.date) - new Date(a.date)));
      changeList(newest);
    } else {
      console.log('Relevance!');
    }
  }
  return (
    <div className="filter-menu" onChange={changeFilter}>
      <div>{`${numReviews} reviews, sorted by: `}</div>
      <select className="dropdown-box">
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>
    </div>
  );
}
