import React, { useState } from 'react';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import Price from '../Overview/Price.jsx';

function Card({
  productInfo, setId, related, id, crossClickHandler
}) {
  const [showModal, setShowModal] = useState(false);

  function cardClickHandler() {
    setId(productInfo.id);
  }

  function starClickHandler() {
    setShowModal(true);
  }

  function crossClick(productInfo) {
    crossClickHandler(productInfo.id);
  }

  return (
    <div className="card">
      {related ? <span className="btn action-button" onClick={starClickHandler}>&#9733;</span>
        : <span className="btn action-button cross-btn" onClick={crossClick}>&#10005;</span>}
      <div onClick={cardClickHandler}>
        <img className="card-img" src={productInfo.photoURL ? productInfo.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" />
        <ul className="card-text">
          <li className="card-category">{productInfo.category}</li>
          <li className="card-name">{productInfo.name}</li>
          <Price selectedStyle={productInfo} />
          <Stars productId={productInfo.id} />
        </ul>
      </div>
      {showModal
      && <ComparisonModal productInfo={productInfo} id={id} setShowModal={setShowModal} />}
    </div>
  );
}

export default Card;
