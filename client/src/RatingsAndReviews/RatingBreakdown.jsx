import React from 'react';
import BreakdownBars from './BreakdownBars.jsx';

export default function RatingBreakdown({ratingsList}) {
  const breakdown = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  ratingsList.forEach((rating) => {
    breakdown[rating]++;
  });

  const totalRatings = ratingsList.length;
  // barGraph will be an array of arrays - a tuple representing L/R portions of a bar graph
  // to be used on 2 columns with respective flex-basis.
  // if there were 31 5 stars out of 107 reviews, the bar graph would look like:
  //   29%    71%
  // [[Col1, col2],...]
  const barGraph = [[]];

  for (let rating in breakdown) {
    const qty = breakdown[rating];
    const col1 = Math.round((qty / totalRatings) * 100);
    const col2 = 100 - col1;
    // the rating is directly correlated with the index (index 0 is empty array)
    barGraph[rating] = ([col1, col2]);
  }

  const descendingRatings = barGraph.slice(1).reverse();

  return (
    <div className="all-rating-bars">
      {descendingRatings.map((bar, index) => {
        let rating;
        if (index === 0) {
          rating = 5;
        } else if (index === 1) {
          rating = 4;
        } else if (index === 2) {
          rating = 3;
        } else if (index === 3) {
          rating = 2;
        } else {
          rating = 1;
        }
        return <BreakdownBars bar={bar} rating={rating} qty={breakdown[rating]} key={rating} />;
      })}
    </div>
  );
}
