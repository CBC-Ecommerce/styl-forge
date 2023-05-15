import React, { useEffect } from 'react';
import CharacteristicEntry from './CharacteristicEntry.jsx';

function CharacteristicsList({ currentProInfo, productInfo }) {
  const [features, setFeatures] = React.useState([]);
  // console.log(productInfo, 'this is the compared product*******');
  // console.log(currentProInfo, 'this is the current product******');

  function getCharList(comparedProduct, currentProduct) {
    const featuresArr = [];
    currentProduct.features?.forEach((el) => {
      const featureObj = {};
      featureObj[el.feature] = [el.value];
      featuresArr.push(featureObj);
    });

    comparedProduct.features.forEach((el) => {
      let isPresent = false;
      featuresArr.forEach((obj) => {
        if (el.feature === Object.keys(obj)[0]) {
          const key = el.feature;
          obj[key].push(el.value);
          isPresent = true;
        }
      });
      if (!isPresent) {
        const featureObj2 = {};
        featureObj2[el.feature] = [undefined, el.value];
        featuresArr.push(featureObj2);
      }
    });
    setFeatures(featuresArr);
  }

  useEffect(() => {
    getCharList(productInfo, currentProInfo);
  }, []);

  return (
    <tbody>
      {features.map((feature) => <CharacteristicEntry feature={feature} key={Object.keys(feature)[0]}/>)}
    </tbody>
  );
}
export default CharacteristicsList;
