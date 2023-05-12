import React, { useState } from 'react';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import Price from '../Overview/Price.jsx';

function Card({
  productInfo, setId, related, id, crossClickHandler,
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
    <div>
      {related ? <span onClick={starClickHandler}>&#9733;</span>
        : <span onClick={crossClick}>&#10005;</span>}
      <div className="card" onClick={cardClickHandler}>
        <img className="cardImg" src={productInfo.photoURL ? productInfo.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" />
        <span className="category">{productInfo.category}</span>
        <p className="cardName">{productInfo.name}</p>
        <Price selectedStyle={productInfo} />
        <Stars productId={productInfo.id} />
      </div>
      {showModal
      && <ComparisonModal productInfo={productInfo} id={id} setShowModal={setShowModal} />}
    </div>

  );
}

export default Card;
