import React from 'react';

export default function SingleImage({ photoUrl, activeImage, index }) {
  return (
    <ul className="single-img">
      <img src={photoUrl} alt="a description of the img" />
    </ul>
  );
}
