import React, { useState, useEffect } from 'react';

function SearchQuestions({ quests, filterQuestion }) {
  // const [filter, setFilter] = useState('');
  const filterChanger = (e) => {
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
    <div>
      Filter Your Search!
      {/* <form onSubmit={filterSubmitter}> */}
      <input type="text" placeholder="Search Questions" onChange={filterChanger} />
      {/* <input type="submit" value="Filter" /> */}
      {/* </form> */}
    </div>
  );
}

export default SearchQuestions;
