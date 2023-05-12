import React, { useState } from 'react';
import SingleImage from './SingleImage.jsx';

export default function Carousel({ allPics }) {
  const [activeImage, setActiveImage] = useState(0);
  return (
      <div className="carousel">
        <button className="carousel-button prev" type="button" onClick={() => setActiveImage(activeImage - 1)}>&#8592;</button>
        <button className="carousel-button next" type="button" onClick={() => setActiveImage(activeImage + 1)}>&#8594;</button>
        {allPics.map((photo, index) => (
          <SingleImage
            photoUrl={photo}
            activeImage={activeImage}
            index={index}
            key={index}
          />
        ))}
      </div>
  );
}
