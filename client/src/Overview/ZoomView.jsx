import React from 'react';
import GetMousePosition from './GetMousePosition.jsx';

export default function ZoomView({ img }) {
  return (
    <div className="zoom-view" id="zoom-view">
      <img className="zoomed-image" src={img} alt="super zoomer" />
      {img && <GetMousePosition />}
    </div>
  );
}
