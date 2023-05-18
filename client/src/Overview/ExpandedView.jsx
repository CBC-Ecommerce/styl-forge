import React, { useState } from 'react';
import ZoomView from '../Overview/ZoomView.jsx';
import Carousel from './CarouselV2.jsx';
import SingleImage from './SingleImage.jsx';

export default function ExpandedView({ stylePhotos, activeImage, toggleModal, handleNextClick, handlePrevClick }) {
  const [zoomView, setZoomView] = useState(false);
  function closeModal() {
    toggleModal();
  }
  return (
    <div className="screen-overlay">
      {zoomView === false && (
        <>
          <button className="expanded-button carousel-button prev" type="button" onClick={handlePrevClick}>&#8592;</button>
          <button className="expanded-button carousel-button next" type="button" onClick={handleNextClick}>&#8594;</button>
          <button className="close-expanded-view" type="button" onClick={closeModal}>X</button>
        </>
      )}
      <div className="expanded-view-modal" onClick={() => {setZoomView(!zoomView); console.log('click')}}>
        {stylePhotos.map((photoUrl, index) => (
          <SingleImage
            photoUrl={photoUrl.url}
            activeImage={activeImage}
            index={index}
            toggleModal={toggleModal}
            expanded
            key={index}
          />
        ))}
        <Carousel nameOfImageClass={'.single-image'} />
        {zoomView && <ZoomView img={stylePhotos[activeImage].url} />}
      </div>
    </div>
  );
}
