import React from 'react';

export default function Thumbnails({ thumbNailUrl, index, activeImage, setActiveImage }) {
  return (
    <ul className="single-thumbnail" onClick={() => setActiveImage(index)}>
      <img className="thumbnail-image" src={thumbNailUrl} alt="thumbnail" />
      {index === activeImage && <div className="thumbnail-underline"></div>}
    </ul>
  );
}
