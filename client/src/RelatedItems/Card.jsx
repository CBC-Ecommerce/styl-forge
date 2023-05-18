import React from 'react';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import Price from '../Overview/Price.jsx';
import ImgCarousel from './ImgCarousel.jsx';

function Card({
  productInfo, setId, related, id, crossClickHandler
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [comparedProId, setComparedProId] = React.useState(productInfo.id);

  function cardClickHandler() {
    setId(productInfo.id);
  }

  function starClickHandler() {
    setShowModal(true);
  }

  function crossClick() {
    crossClickHandler(comparedProId);
  }

  return (
    <div className="card" data-testid="card">
      {related ? <span className="btn action-button" data-testid="star" onClick={starClickHandler}>&#9733;</span>
        : <span className="btn action-button cross-btn" data-testid="cross" onClick={crossClick}>&#10005;</span>}
      <div>
        <ImgCarousel productInfo={productInfo} />
        <ul className="card-text" onClick={cardClickHandler}>
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

{/* <img className="card-img" src={productInfo.photoURL ? productInfo.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" /> */}