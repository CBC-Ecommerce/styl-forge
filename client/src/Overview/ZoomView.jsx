import React from 'react';
import GetMousePosition from './GetMousePosition.jsx';

export default function ZoomView({ img, closeZoomView }) {
  return (
    <div className="zoomed-image-container" id="zoomed-image-container" aria-abel="click to close zoomed view" onClick={closeZoomView}>
      <GetMousePosition img={img} />
    </div>
  );
}
