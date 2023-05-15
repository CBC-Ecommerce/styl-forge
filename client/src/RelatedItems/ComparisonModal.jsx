import React, { useEffect } from 'react';
import axios from 'axios';
import CharacteristicsList from './CharacteristicsList.jsx';


function ComparisonModal({ productInfo, id, setShowModal }) {
  const [currentProInfo, setCurrentProInfo] = React.useState({});

  function getProductInfo(productId) {
    axios.get(`products/?product_id=${productId}`)
      ?.then((res) => {
        setCurrentProInfo(
          { name: res.data.name, category: res.data.category, features: res.data.features },
        );
      })
      .catch((err) => {
        throw new Error(err, 'Failed to get product information');
      });
  }

  function closeClickHandler(e) {
    setShowModal(false);
  }

  useEffect(() => {
    getProductInfo(id);
  }, []);

  return (
    <div className="modalBox" data-testid="compModal">
      <div className="compModal">
        <h4>COMPARING</h4>
        <span className="btn closeModal-btn" onClick={closeClickHandler}>&#10005;</span>
        <table className="comp-table">
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
