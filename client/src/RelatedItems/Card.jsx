/* global localStorage */
import React, { useState, useEffect } from 'react';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';
import ComparisonModal from './ComparisonModal.jsx';

function Card({
  productInfo, setId, related, id,
}) {
  const [showModal, setShowModal] = useState(false);

  function cardClickHandler() {
    setId(productInfo.id);
  }

  function starClickHandler() {
    setShowModal(true);
  }

  function crossClickHandler() {
    const outfitList = JSON.parse(localStorage.getItem('outfits'));
    const index = outfitList.indexOf(productInfo.id);
    outfitList.splice(index, 1);
    localStorage.removeItem('outfits');
    localStorage.setItem('outfits', JSON.stringify(outfitList));
  }

  return (
    <div>
      {related ? <span onClick={starClickHandler}>&#9733;</span>
        : <span onClick={crossClickHandler}>&#10005;</span>}
      <div className="card" onClick={cardClickHandler}>
        <img className="cardImg" src={productInfo.photoURL ? productInfo.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" />
        <span className="category">{productInfo.category}</span>
        <p className="cardName">{productInfo.name}</p>
        <span>
          {productInfo.salePrice === null
            ? productInfo.originalPrice : productInfo.salePrice + productInfo.originalPrice}
        </span>
        <Stars productId={productInfo.id} />
      </div>
      {showModal &&
        <ComparisonModal productInfo={productInfo} id={id} setShowModal={setShowModal} />}
    </div>

  );
}

export default Card;
