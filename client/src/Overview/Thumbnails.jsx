import React from 'react';

export default function Thumbnails({ thumbNailUrl, index, activeImage, setActiveImage }) {
  console.log(index, activeImage);
  return (
    <ul className="single-thumbnail" onClick={() => setActiveImage(index)}>
      <img src={thumbNailUrl} alt="thumbnail" />
      {index === activeImage && <div className="thumbnail-underline"></div>}
    </ul>
  );
}
