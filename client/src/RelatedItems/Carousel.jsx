import React, { useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';


function Carousel({
  idList, setId, related, id, crossClickHandler,
}) {
  const [productInfo, setproductInfo] = React.useState([]);
  const [stylesInfo, setStylesInfo] = React.useState([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(2);
  const length = idList ? idList.length : 0;

  function getProductInfo(list) {
    const data = list?.map((productId) => axios.get(`products/?product_id=${productId}`)
      ?.then((res) => ({
        name: res.data?.name,
        category: res.data?.category,
        features: res.data?.features,
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
    const data = list?.map((productId) => axios.get(`products/?product_id=${productId}/styles`)
      ?.then((res) => {
        let index = 0;
        let images = [];
        let thumbnails = [];
        res.data.results?.forEach((el, i) => {
          if (el['default?']) {
            index = i;
          }
          if (el.photos[0]) {
            images.push(el.photos[0].url);
            thumbnails.push(el.photos[0].thumbnail_url)
          }
          if (el.photos[1]) {
            images.push(el.photos[1].url);
            thumbnails.push(el.photos[1].thumbnail_url)
          }
        });
        const updates = {
          original_price: res.data?.results[index].original_price,
          sale_price: res.data?.results[index].sale_price,
          photoURL: res.data?.results[index].photos[0].url,
          images: images,
          thumbnails: thumbnails,
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

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(2);
  }, [id]);

  function prevClickHandler() {
    if (startIndex <= 0) {
      return;
    }
    setStartIndex(startIndex => startIndex - 1);
    setEndIndex(endIndex => endIndex - 1);
  }

  function nextClickHandler() {
    if (endIndex >= length - 1 || (endIndex >= length - 2 && related)) {
      return;
    }
    setStartIndex(startIndex => startIndex + 1);
    setEndIndex(endIndex => endIndex + 1);
  }
  console.log(startIndex)
  return (
    <>
      {startIndex !== 0 && (
      <span
        className="btn arrow-btn left-arrow" data-testid="leftArrow"
        onClick={prevClickHandler}
      >
        &#60;
      </span>
      )}
      {productInfo?.map((info, i) => {
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
        || (related === undefined && (endIndex >= length - 1))) {
          return null;
        } else if (length === 0) {
          return null;
        }
        return (
          <span className="btn arrow-btn right-arrow"
          data-testid="rightArrow"
          onClick={nextClickHandler}>
            &#62;
          </span>
        );
      })()}
    </>
  );
}
export default Carousel;
