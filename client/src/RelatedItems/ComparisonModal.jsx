import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacteristicsList from './CharacteristicsList.jsx';
import './css/modalStyle.css';

function ComparisonModal({ productInfo, id }) {
  const [currentProInfo, setCurrentProInfo] = useState({});

  function getProductInfo(productId) {
    axios.get(`products/?product_id=${productId}`)
      .then((res) => {
        setCurrentProInfo(
          { name: res.data.name, category: res.data.category, features: res.data.features },
        );
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  useEffect(() => {
    getProductInfo(id);
  }, []);

  return (
    <div className="modalBox">
      <div className="compModal">
        <h4>COMPARING</h4>
        <table>
          <thead>
            <tr>
              <th>{currentProInfo.name}</th>
              <th>{productInfo.name}</th>
            </tr>
          </thead>
          <CharacteristicsList productInfo={productInfo} currentProInfo={currentProInfo} />
        </table>
      </div>
    </div>
  );
}
export default ComparisonModal;
