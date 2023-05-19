import React, { useState, useEffect } from 'react';
import './style/SearchQuestions.css';

function SearchQuestions({ quests, filterQuestion }) {
  const [filter, setFilter] = useState('');
  const filterChanger = (e) => {
    // Set timeout to reduce # of function invokations
    setFilter(e.target.value);
    if (e.target.value.length >= 3) {
      filterQuestion(e.target.value);
    } else {
      filterQuestion('');
    }
  };

  // const filterSubmitter = (e) => {
  //   e.preventDefault();
  //   filterQuestion(filter);
  // };

  return (
    <div className="Search-Question">
      {/* <div className="search-text" data-testid="SearchQuestionTest">
        Filter Your Search!
      </div> */}
      <input data-testid="search-bar" className="Search-Bar" type="text" placeholder="Search Questions" value={filter} onChange={filterChanger} />
    </div>
  );
}

export default SearchQuestions;
