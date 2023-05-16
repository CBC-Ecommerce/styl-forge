import React from 'react';
import './css/DynamicStar.css';

export default function DynamicStarList() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);

  return (
    <div className="dynamic-star-list">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        const style = {
          color: currentRating <= (hover || rating) ? 'rgb(255, 191, 42)' : '#ABAEB5',
        };
        return (
          <button
            type="button"
            key={currentRating}
            className="dynamic-star"
            onClick={() => { setRating(currentRating); }}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="fa-solid fa-star" style={style} />
          </button>
        );
      })}
    </div>
  );
}