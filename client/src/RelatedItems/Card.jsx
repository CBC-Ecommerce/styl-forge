/* global localStorage */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';
import ComparisonModal from './ComparisonModal.jsx';

function Card({
  compareId, setId, related, id,
}) {
  const [productInfo, setproductInfo] = useState({});
  const [stylesInfo, setStylesInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  function getProductInfo(productId) {
    axios.get(`products/?product_id=${productId}`)
      .then((res) => {
        setproductInfo(
          { name: res.data.name, category: res.data.category, features: res.data.features },
        );
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function getPriceImage(productId) {
    axios.get(`products/?product_id=${productId}/styles`)
      .then((res) => {
        let index = 0;
        res.data.results.forEach((el, i) => {
          if (el['default?']) {
            index = i;
          }
        });
        const updates = {
          originalPrice: res.data.results[index].original_price,
          salePrice: res.data.results[index].sale_price,
          photoURL: res.data.results[index].photos[0].url,
        };
        setStylesInfo(updates);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function cardClickHandler() {
    setId(compareId);
  }

  function starClickHandler() {
    setShowModal(true);
  }

  function crossClickHandler() {
    const outfitList = JSON.parse(localStorage.getItem('outfits'));
    const index = outfitList.indexOf(compareId);
    outfitList.splice(index, 1);
    localStorage.removeItem('outfits');
    localStorage.setItem('outfits', JSON.stringify(outfitList));
  }

  useEffect(() => {
    getProductInfo(compareId);
    getPriceImage(compareId);
  }, []);

  return (
    <div>
      {related ? <span onClick={starClickHandler}>&#9733;</span>
        : <span onClick={crossClickHandler}>&#10005;</span>}
      <div className="card" onClick={cardClickHandler}>
        <img className="cardImg" src={stylesInfo.photoURL ? stylesInfo.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" />
        <span className="category">{productInfo.category}</span>
        <p className="cardName">{productInfo.name}</p>
        <span>
          {stylesInfo.salePrice === null
            ? stylesInfo.originalPrice : stylesInfo.salePrice + stylesInfo.originalPrice}
        </span>
        <Stars productId={compareId} />
      </div>
      {showModal &&
        <ComparisonModal productInfo={productInfo} id={id} setShowModal={setShowModal} />}
    </div>

  );
}

export default Card;
