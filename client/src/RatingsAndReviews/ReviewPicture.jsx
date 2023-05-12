/* eslint-disable import/extensions */
import React from 'react';
import ReviewModal from './ReviewModal.jsx';

export default function ReviewPicture({src}) {
  const [modal, setModal] = React.useState(false);

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
        <img className="thumbnail" style={style} onClick={toggleModal} data-testid="thumbnail" alt=""/>
        {modal && (
          <ReviewModal toggleModal={toggleModal} img={src} />
        )}
      </>
    );
  }
  return <div />;
}
