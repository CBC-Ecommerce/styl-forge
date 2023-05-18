import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './Title.jsx';
import Price from './Price.jsx';
import Category from './Category.jsx';
import Stars from '../RatingsAndReviews/StaticStarList.jsx';
import StyleSelector from './StyleSelector.jsx';
import ImageGallery from './ImageGallery.jsx';
import AddToCart from './AddToCart.jsx';
import './css/Overview.css';

export default function Overview({ product, id, reviewList }) {
  const [styles, setStyles] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  // get style information for selector
  useEffect(() => {
    axios.get(`products/?product_id=${id}/styles`)
      .then((result) => {
        setStyles(result.data);
        setSelectedStyle(result.data.results[0]);
      })
      .catch((err) => { throw err; });
  }, [id]);

  // selected style click handler
  function styleSelectClickHandler(e) {
    // for (var i = 0; i < )
    for (let i = 0; i < styles.results.length; i += 1) {
      if (styles.results[i].style_id.toString() === e.target.id) {
        setSelectedStyle(styles.results[i]);
      }
    }
  }

  return (
    <div id="Overview" data-testid="Overview">
      {styles && (
      <>
      <div className="image-gallery-box">
        <ImageGallery selectedStyle={selectedStyle} />
      </div>
        <div className="info-and-style-selector">
          <div className="product-info-box">
            <div className="stars" data-testid="stars">
              <Stars productId={id} />
              {reviewList.length > 0 && <a href="#main-container" className="review-link">Read all {reviewList.length} reviews</a>}
            </div>
            <Category name={product.category} />
            <Title name={product.name} />
            {styles && <Price selectedStyle={selectedStyle} />}
          </div>
          <div className="style-selector-box">
            <StyleSelector
              styles={styles}
              selectedStyle={selectedStyle}
              styleSelectClickHandler={styleSelectClickHandler}
            />
          </div>
          <div className="add-to-cart-box">
            <AddToCart selectedStyle={selectedStyle} />
          </div>
        </div>
      </>
      )}
    </div>
  );
}
