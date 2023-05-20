import React from 'react';

export default function SingleImage({
  photoUrl,
  activeImage,
  prevImage,
  index,
  toggleModal,
  expanded
}) {
  if (expanded) {
    return (
      <ul className="single-img expanded-view" style={{ transform: `translateX(${100 * (index - activeImage)}%)` }}>
        {(activeImage === index) ? (
          <img className="image expanded" id="active-image" src={photoUrl} alt="a description of the img" style={{ display: "flex" }} />
        ) : (
          <img className="image expanded" src={photoUrl} alt="a description of the img" style={{ display: "none" }} />
        )}
      </ul>
    );
  }
  return (
    <ul className="single-img" style={{ transform: `translateX(${100 * (index - activeImage)}%)` }}>
      {(activeImage === index) ? (
        <img className="image" id="active-image" src={photoUrl ? photoUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="a description of the img" style={{ display: "flex" }} onClick={toggleModal} aria-abel="zoom image" />
      ) : (
        <img className="image" src={photoUrl ? photoUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="a description of the img" style={{ display: "none" }} onClick={toggleModal} aria-abel="unzoom image"/>
      )}
    </ul>
  );
}
