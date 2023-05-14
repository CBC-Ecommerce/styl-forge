import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import './css/carousel.css';

function Carousel({
  idList, setId, related, id, crossClickHandler,
}) {
  const [productInfo, setproductInfo] = useState([]);
  const [stylesInfo, setStylesInfo] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(startIndex + 2);
  const { length } = idList;

  function getProductInfo(list) {
    const data = list.map((productId) => axios.get(`products/?product_id=${productId}`)
      .then((res) => ({
        name: res.data.name,
        category: res.data.category,
        features: res.data.features,
      })));

    Promise.all(data)
      .then((res) => {
        setproductInfo(res);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function getPriceImage(list) {
    const data = list.map((productId) => axios.get(`products/?product_id=${productId}/styles`)
      .then((res) => {
        let index = 0;
        res.data.results.forEach((el, i) => {
          if (el['default?']) {
            index = i;
          }
        });
        const updates = {
          original_price: res.data.results[index].original_price,
          sale_price: res.data.results[index].sale_price,
          photoURL: res.data.results[index].photos[0].url,
        };
        return updates;
      }));

    Promise.all(data)
      .then((res) => {
        setStylesInfo(res);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product style information');
      });
  }

  useEffect(() => {
    getProductInfo(idList);
    getPriceImage(idList);
  }, [idList]);

  function prevClickHandler() {
    if (startIndex <= 0) {
      return;
    }
    setStartIndex(startIndex - 1);
    setEndIndex(endIndex - 1);
  }

  function nextClickHandler() {
    if (endIndex >= length - 1 || (endIndex >= length - 2 && related)) {
      return;
    }
    setStartIndex(startIndex + 1);
    setEndIndex(endIndex + 1);
  }

  return (
    <>
      {startIndex !== 0 && (
      <span
        className="btn arrow-btn left-arrow"
        onClick={prevClickHandler}
      >
        &#60;
      </span>
      )}
      {productInfo.map((info, i) => {
        const allInfo = { ...info, ...stylesInfo[i], id: idList[i] };
        if (related !== undefined) {
          if (i >= startIndex && i <= (endIndex + 1)) {
            return (
              <Card
                productInfo={allInfo}
                setId={setId}
                id={id}
                related={related}
                crossClickHandler={crossClickHandler}
                key={allInfo.name}
              />
            );
          }
          return null;
        }
        if (i >= startIndex && i <= endIndex) {
          return (
            <Card
              productInfo={allInfo}
              setId={setId}
              id={id}
              related={related}
              crossClickHandler={crossClickHandler}
              key={allInfo.name}
            />
          );
        }
        return null;
      })}
      {(() => {
        if ((related && (endIndex === length - 2))
        || (related === undefined && (endIndex === length - 1))) {
          return null;
        }
        return (
          <span className="btn arrow-btn right-arrow" onClick={nextClickHandler}>
            &#62;
          </span>
        );
      })()}
    </>
  );
}
export default Carousel;
