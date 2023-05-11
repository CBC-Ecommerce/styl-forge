import React, { useState } from 'react';

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
    marginRight: '10px',
  };

  function toggleModal() {
    setModal(!modal);
  }

  if (src) {
    return (
      <>
        <div className="thumbnail" style={style} onClick={toggleModal}></div>
        {modal ? (
          <div className="screen-overlay">
            <div
              className="modal"
              onClick={toggleModal}
            />
            <img className="modal-img" src={src} alt="Customer Review  404" />
            <button type="button" className="close-modal" onClick={toggleModal}>X</button>
          </div>
        ) : <div />}
      </>
    );
  }
  return <div />;
}
