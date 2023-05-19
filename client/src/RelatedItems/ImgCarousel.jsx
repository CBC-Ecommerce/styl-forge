import React from 'react';

function ImgCarousel({productInfo}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [images, setImages] = React.useState(productInfo.images);
  const [showArrow, setShowArrow] = React.useState(false);
  const length = productInfo.images?.length;

  function prevClickHandler () {
    if (currentIndex <= 0) {
      return;
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function nextClickHandler () {
    if (currentIndex >= length - 1) {
      return;
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function mouseEnterHandler () {
    setShowArrow(true);
  }

  function mouseLeaveHandler () {
    setShowArrow(false);
  }

  return (
    <div className="card-img" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      {currentIndex !== 0 && showArrow && (
      <span
        className="arrow-btn left-arrow-img"
        onClick={prevClickHandler}>&#60;</span>
      )}
      {productInfo.images?.map((img, i) => {
        if (i === currentIndex) {
          return (<img className="card-img" src={img ? img : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" key={productInfo.id}/>);
        }
      })}
      {currentIndex !== (length - 1) && showArrow && (
      <span
        className="arrow-btn right-arrow-img"
        onClick={nextClickHandler}>&#62;</span>
      )}
    </div>
  );
}

export default ImgCarousel;
