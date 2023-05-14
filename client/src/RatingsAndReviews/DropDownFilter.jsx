import React, { useEffect } from 'react';
import './css/DropDown.css';

export default function DropDownFilter({ currentList, changeList, numReviews }) {
  function changeFilter(event, startingVal) {
    let value;
    if (startingVal) {
      value = startingVal;
    } else {
      value = event.target.value;
    }
    if (value === 'helpful') {
      // There is no way to update the "No" value, nor access the "No" count, so just on "Yes"
      const helpful = currentList.sort((a, b) => (b.helpfulness - a.helpfulness));
      changeList(helpful);
    } else if (value === 'newest') {
      const newest = currentList.sort((a, b) => (new Date(b.date) - new Date(a.date)));
      changeList(newest);
    } else {
      const relevance = currentList.sort((a, b) => {
        if (a.helpfulness > b.helpfulness) {
          // If helpfulness of a is higher than b, sort a before b
          return -1;
        }
        if (a.helpfulness < b.helpfulness) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      changeList(relevance);
    }
  }

  useEffect(() => {
    changeFilter(null, 'relevant');
  }, []);

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
