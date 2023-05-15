import React, { useState, useEffect } from 'react';

function SearchQuestions({ quests, filterQuestion }) {
  const [filter, setFilter] = useState('');
  const filterChanger = (e) => {
    setFilter(e.target.value);
    // filterQuestion(e.target.value);
  };

  const filterSubmitter = (e) => {
    e.preventDefault();
    filterQuestion(filter);
  };

  return (
    <div>
      Filter Your Search!
      <form onSubmit={filterSubmitter}>
        <input type="text" placeholder="Search Questions" value={filter} onChange={filterChanger} />
        <input type="submit" value="Filter" />
      </form>
    </div>
  );
}

export default SearchQuestions;
