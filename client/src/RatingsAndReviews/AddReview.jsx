/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicStarList from './DynamicStarList.jsx';

export default function AddReview({id, toggleModal}) {
  const [prodName, setProdName] = useState('');
  const [overallRate, setOverallRate] = useState(0);
  const [rateMsg, setRateMsg] = useState('');

  function overallResults(rating) {
    setOverallRate(rating);
  }

  useEffect(() => {
    if (overallRate === 1) {
      setRateMsg('Poor');
    } else if (overallRate === 2) {
      setRateMsg('Fair');
    } else if (overallRate === 3) {
      setRateMsg('Average');
    } else if (overallRate === 4) {
      setRateMsg('Good');
    } else {
      setRateMsg('Great');
    }
  }, [overallRate]);

  useEffect(() => {
    axios.get(`/products?product_id=${id}`)
      .then((results) => { setProdName(results.data.name); })
      .catch((err) => { throw err; });
  }, [id]);

  return (
    <div className="screen-overlay">
      <div className="modal-add-review">
        <div className="modal-heading">
          <h3>Write Your Review</h3>
          <span>{`About the ${prodName}`}</span>
        </div>
        <button type="button" className="close-modal" onClick={toggleModal}>X</button>
        <form type="submit">
          <div className="overall-stars">
            <div className="overall-label">Overall Rating</div>
            <DynamicStarList overallResults={overallResults} />
            {overallRate > 0 && <span className="star-selected-msg">{rateMsg}</span>}
            <div className="dividing-bar" />
          </div>
          <div className="would-recommend">
            <div className="recommend-label">Do you recommend this product?</div>
            <label>
              <input type="radio" name="" value="true" defaultChecked={true} />
              Yes
            </label>
            <label>
              <input type="radio" name="" value="false" />
              No
            </label>
            <div className="dividing-bar" />
          </div>
        </form>
      </div>

    </div>
  );
}
