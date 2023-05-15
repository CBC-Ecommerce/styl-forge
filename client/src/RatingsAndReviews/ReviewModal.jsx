import React from 'react';
import PropTypes from 'react'
import './css/Modal.css';

export default function ReviewModal({img, toggleModal}) {
  function closeModal() {
    toggleModal();
  }
  return (
    <div className="screen-overlay" onClick={closeModal} data-testid="overlay" >
      <div className="modal" data-testid="r-modal">
        <img src={img} alt="User Visual for Product" />
        <button type="button" onClick={closeModal}>X</button>
      </div>
    </div>
  );
}
