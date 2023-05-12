import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

function Carousel({
  idList, setId, related, id, crossClickHandler,
}) {

  const [productInfo, setproductInfo] = useState([]);
  const [stylesInfo, setStylesInfo] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = idList.length;

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

  function nextCard() {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }

  function prevCard() {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }

  return (
    <>
      {current !==0 && <span className="leftArrow" onClick={prevCard}>&#60;</span>}
      {current !== length - 1 && <span className="rightArrow" onClick={nextCard}>&#62;</span>}
      {productInfo?.map((info, i) => {
        const allInfo = {...info, ...stylesInfo[i], id: idList[i]};
        return (
          <div key={allInfo.name}>
            {/* logics to render three cards at a time */}
            {(() => {
              if (current === length -1 && (i === current - 1 || i === 0 || i === current)) {
                return (<Card productInfo={allInfo} setId={setId} id={id} related={related} crossClickHandler={crossClickHandler} />);
              } else if (current === 0 && (i === current + 1 || i === length - 1 || i === current)) {
                return (<Card productInfo={allInfo} setId={setId} id={id} related={related} crossClickHandler={crossClickHandler} />);
              } else if (current >= 1 && current <= length -2 && i >= current - 1 && i <= current + 1) {
                return (<Card productInfo={allInfo} setId={setId} id={id} related={related} crossClickHandler={crossClickHandler} />);
              } else {
                return null;
              }
            })()}
          </div>
        )
      })}
    </>
  );
}
export default Carousel;

