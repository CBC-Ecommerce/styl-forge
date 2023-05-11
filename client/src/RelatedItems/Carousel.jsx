import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

function Carousel({
  idList, setId, related, id,
}) {
  console.log(idList)
  const [productInfo, setproductInfo] = useState([]);
  const [stylesInfo, setStylesInfo] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = idList.length;

  function getProductInfo(list) {
    console.log('getProductInfo is invoked')
    const data = list.map((productId) => axios.get(`products/?product_id=${productId}`)
      .then((res) => ({
        name: res.data.name,
        category: res.data.category,
        features: res.data.features,
      })));

    Promise.all(data)
      .then((res) => {
        console.log(res);
        setproductInfo(res);
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function getPriceImage(list) {
    console.log('getPriceImage is invoked')
    const data = list.map((productId) => axios.get(`products/?product_id=${productId}/styles`)
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
        return updates;
      }));

    Promise.all(data)
      .then((res) => {
        console.log(res);
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

  return (
    <div>
      <span className="leftArrow">&#60;</span>
      <span className="rightArrow">&#62;</span>
      {productInfo?.map((info, i) => {
        const allInfo = {...info, ...stylesInfo[i], id: idList[i]};
        console.log(allInfo);
        return (
          <div>
            {i <= current + 2 && <Card productInfo={allInfo} setId={setId} id={id} related={related}/>}
          </div>
        )
      })}
    </div>
  );
}
export default Carousel;
