import React, { useState } from 'react';
import Carousel from './CarouselV2.jsx';
import SingleImage from './SingleImage.jsx';

export default function ExpandedView({ stylePhotos, activeImage, toggleModal, handleNextClick, handlePrevClick, zoomView, setZoomView }) {
  function closeModal() {
    toggleModal();
  }

  return (
    <div className="screen-overlay" id="sreen-overlay">
      {zoomView === false && (
        <>
          <button className="expanded-button carousel-button prev" type="button" onClick={handlePrevClick} aria-abel="view previous expanded image">&#8592;</button>
          <button className="expanded-button carousel-button next" type="button" onClick={handleNextClick} aria-abel="view next expanded image">&#8594;</button>
          <button className="close-expanded-view" type="button" onClick={closeModal} aria-abel="close expanded view">X</button>
        </>
      )}
      <div className="expanded-view-modal" onClick={() => {setZoomView(!zoomView)}} aria-abel="zoom in more">
        {stylePhotos.map((photoUrl, index) => (
          <SingleImage
            photoUrl={photoUrl.url}
            activeImage={activeImage}
            index={index}
            expanded
            key={index}
          />
        ))}
        <Carousel nameOfImageClass={'.single-image'} />
      </div>
    </div>
  );
}
