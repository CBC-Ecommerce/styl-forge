import React, { useState } from 'react';
import Carousel from './Carousel.jsx';

// image gallery renders image carousel from styles of selected product
export default function ImageGallery({ selectedStyle }) {
  // console.log(selectedStyle);
  let stylePhotos = [];
  for (let i = 0; i < selectedStyle.photos.length; i++) {
    stylePhotos.push(selectedStyle.photos[i].url);
  }
  return (
    <div className="image-gallery">
      <Carousel allPics={stylePhotos} />
      {/* Thumbnails */}
    </div>
  );
}
