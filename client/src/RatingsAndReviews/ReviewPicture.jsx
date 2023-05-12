import React, { useState } from 'react';
import ReviewModal from './ReviewModal.jsx';

export default function ReviewPicture({src}) {
  const [modal, setModal] = useState(false);

  const style = {
    backgroundImage: `url(${src})`,
    width: '50px',
    height: '50px',
    display: 'inline-block',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginRight: '5px',
  };

  function toggleModal() {
    setModal(!modal);
  }

  if (src) {
    return (
      <>
        <div className="thumbnail" style={style} onClick={toggleModal}></div>
        {modal && (
          <ReviewModal toggleModal={toggleModal} img={src} />
        )}
      </>
    );
  }
  return <div />;
}
