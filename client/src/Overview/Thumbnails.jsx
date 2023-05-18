import React from 'react';

export default function Thumbnails({ thumbNailUrl, index, activeImage, setActiveImage }) {
  return (
    <ul className="single-thumbnail" onClick={() => setActiveImage(index)}>
      {index === activeImage ? (
        <img className="thumbnail-image" src={thumbNailUrl} alt="thumbnail" style={{ border: 'solid' }} />
      ) : (
        <img className="thumbnail-image" src={thumbNailUrl} alt="thumbnail" />
      )}
    </ul>
  );
}
