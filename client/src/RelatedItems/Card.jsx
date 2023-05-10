import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';

function Card({ id, setId }) {
  const [productInfo, setproductInfo] = useState({});
  const [stylesInfo, setStylesInfo] = useState({});

  function getProductInfo(productId) {
    axios.get(`products/?product_id=${productId}`)
      .then((res) => {
        setproductInfo({ name: res.data.name, category: res.data.category });
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
    // console.log(id);
    setId(id);
  }

  useEffect(() => {
    getProductInfo(id);
    getPriceImage(id);
  }, []);

  return (
    <div className="card" onClick={cardClickHandler}>
      <img className="cardImg" src={stylesInfo.photoURL ? stylesInfo.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="related product" />
      <span className="category">{productInfo.category}</span>
      <p className="cardName">{productInfo.name}</p>
      <span>
        {stylesInfo.salePrice === null
          ? stylesInfo.originalPrice : stylesInfo.salePrice + stylesInfo.originalPrice}
      </span>
      <Stars productId={id} />
    </div>
  );
}

export default Card;
