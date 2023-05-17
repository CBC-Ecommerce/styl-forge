import React, { useState } from 'react';
import ZoomView from '../Overview/ZoomView.jsx';

export default function ExpandedView({img, toggleModal, handlePrevClick, handleNextClick}) {
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
        </>
      )}
      <div className="expanded-view-modal" onClick={() => setZoomView(!zoomView)}>
        <img src={img} alt="Expanded gallery view" />
        {zoomView && <ZoomView img={img} />}
      </div>

      <button className="close-expanded-view" type="button" onClick={closeModal}>X</button>
    </div>
  );
}
