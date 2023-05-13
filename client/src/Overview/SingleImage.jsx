import React from 'react';

export default function SingleImage({ photoUrl, activeImage, index }) {
  // check if this is active image
  // console.log(activeImage, index);
  if (activeImage === index) {
    return (
      <ul className="single-img" data-images>
        <img src={photoUrl} alt="a description of the img" />
      </ul>
    );
  }
}
