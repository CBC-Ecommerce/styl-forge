import React, { useState, useEffect } from 'react';

function SearchQuestions({ quests, filterQuestion }) {
  // const [filter, setFilter] = useState('');
  const filterChanger = (e) => {
    // Set timeout to reduce # of function invokations
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
    <div className="SearchQuestion" data-testid="SearchQuestionTest">
      Filter Your Search!
      <input type="text" placeholder="Search Questions" onChange={filterChanger} />
    </div>
  );
}

export default SearchQuestions;
