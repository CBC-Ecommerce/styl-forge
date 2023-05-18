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
        <img className="image" id="active-image" src={photoUrl} alt="a description of the img" style={{ display: "flex" }} onClick={toggleModal} />
      ) : (
        <img className="image" src={photoUrl} alt="a description of the img" style={{ display: "none" }} onClick={toggleModal} />
      )}
    </ul>
  );
}
