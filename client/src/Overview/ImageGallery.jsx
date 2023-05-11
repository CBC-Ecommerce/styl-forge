import React from 'react';

// image gallery renders image carousel from styles of selected product
export default function ImageGallery({ selectedStyle }) {
  console.log('current style', selectedStyle);
  let stylePhotos = [];
  stylePhotos = selectedStyle.photos;
  return (
    <div className="Image-Gallery-div">
      <img className="Image-Gallery" src={stylePhotos[0].url} alt="style photos" />
    </div>
  );
}
