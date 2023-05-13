import React, { useState } from 'react';
import './css/DropDown.css';

export default function DropDownFilter({ reviewList, changeList }) {
  function changeFilter(event) {
    const { value } = event.target;
    if (value === 'helpful') {
      const helpful = reviewList.filter((review) => (review.helpfulness)).sort((a, b) => (b - a));
      changeList(helpful);
    }
  }
  return (
    <div className="filter-menu" onChange={changeFilter}>
      <div>X reviews, sorted by: </div>
      <select className="dropdown-box">
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>
    </div>
  );
}
