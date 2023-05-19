import React from 'react';
import GetMousePosition from './GetMousePosition.jsx';

export default function ZoomView({ img, closeZoomView }) {
  return (
    <div className="zoomed-image-container" id="zoomed-image-container" onClick={closeZoomView}>
      <GetMousePosition img={img} />
    </div>
  );
}
