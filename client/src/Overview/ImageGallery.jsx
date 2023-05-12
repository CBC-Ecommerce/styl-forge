import React, { useState } from 'react';
import Carousel from './Carousel.jsx';
import Thumbnails from './Thumbnails.jsx';

// image gallery renders image carousel from styles of selected product
export default function ImageGallery({ selectedStyle }) {
  const [activeImage, setActiveImage] = useState(0);
  let stylePhotos = [];
  let styleThumbs = [];
  for (let i = 0; i < selectedStyle.photos.length; i++) {
    stylePhotos.push(selectedStyle.photos[i].url);
    styleThumbs.push(selectedStyle.photos[i].thumbnail_url);
  }
  return (
    <div className="image-gallery">
      <Carousel allPics={stylePhotos} activeImage={activeImage} setActiveImage={setActiveImage} />
      <div className="thumbnails">
        {styleThumbs.map((thumbNailUrl, index) => (
          <Thumbnails
            thumbNailUrl={thumbNailUrl}
            index={index}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
