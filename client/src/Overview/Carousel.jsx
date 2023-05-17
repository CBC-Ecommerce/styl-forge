import React, { useState } from 'react';
import SingleImage from './SingleImage.jsx';

export default function Carousel({ allPics, activeImage, setActiveImage }) {
  function handlePrevClick() {
    if (activeImage === 0) {
      setActiveImage(allPics.length - 1);
    } else {
      setActiveImage(activeImage - 1);
    }
  }
  function handleNextClick() {
    if (activeImage === allPics.length - 1) {
      setActiveImage(0);
    } else {
      setActiveImage(activeImage + 1);
    }
  }

  return (
    <div className="carousel" data-testid="carousel">
      <button className="carousel-button prev" type="button" onClick={handlePrevClick}>&#8592;</button>
      <button className="carousel-button next" type="button" onClick={handleNextClick}>&#8594;</button>
      {allPics.map((photoUrl, index) => (
        <SingleImage
          photoUrl={photoUrl.url}
          activeImage={activeImage}
          index={index}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          key={index}
        />
      ))}
    </div>
  );
}
