import React from 'react';
import ExpandedView from '../Overview/ExpandedView.jsx';

export default function SingleImage({ photoUrl, activeImage, index, handlePrevClick, handleNextClick }) {
  const [modal, setModal] = React.useState(false);
  // check if this is active image
  function toggleModal() {
    setModal(!modal);
  }
  if (activeImage === index) {
    return (
      <ul className="single-img" data-images>
        <img src={photoUrl} alt="a description of the img" onClick={toggleModal} />
        {modal && (
          <ExpandedView
            toggleModal={toggleModal}
            img={photoUrl}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        )}
      </ul>
    );
  }
}
