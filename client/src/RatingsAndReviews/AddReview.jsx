/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicStarList from './DynamicStarList.jsx';
import SelectCharacteristics from './SelectCharacteristics.jsx';

export default function AddReview({id, toggleModal}) {
  const [prodName, setProdName] = useState('');
  const [rateMsg, setRateMsg] = useState('');
  const [prodCharac, setProdCharac] = useState([]);
  const [characObj, setCharacObj] = useState({});
  const [charExceed, setCharExceed] = useState(null);
  const [characLimit, setCharacLimit] = useState('');
  const [characLeft, setCharacLeft] = useState('');
  // states for form submission:
  const [overallRate, setOverallRate] = useState(0);
  const [recommendRes, setRecommendRes] = useState(false);
  const [characResults, setCharacResults] = useState({});
  const [summaryRes, setSummaryRes] = useState('');
  const [bodyRes, setBodyRes] = useState('');

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
      .catch((err) => { console.log('Error in fetching product information ', err); });
    axios.get(`/reviews/meta?product_id=${id}`)
      .then((results) => {
        const characArray = Array.from(Object.keys(results.data.characteristics));
        setProdCharac(characArray);
        setCharacObj(results.data.characteristics);
      })
      .catch((err) => { console.log('Error in fetching product characteristics ', err); });
  }, [id]);

  function overallResults(rating) {
    setOverallRate(rating);
  }

  function recommendClick(e) {
    if (e.target.value === 'yes') {
      setRecommendRes(true);
    } else {
      setRecommendRes(false);
    }
  }

  function makeCharacObj(objRow) {
    const resultClone = Object.assign(characResults, objRow);
    setCharacResults(resultClone);
  }

  function handleAddSummary(e) {
    if (e.target.value.length > 60) {
      setCharExceed('Character Limit Exceeded');
    } else {
      setCharExceed(null);
      setSummaryRes(e.target.value);
    }
  }

  function handleAddBody(e) {
    if (e.target.value.length < 50) {
      setBodyRes(e.target.value);
      setCharacLeft(`${e.target.value.length}/50 characters`);
      setCharacLimit('');
    } else if (e.target.value.length >= 50 && e.target.value.length <= 1000) {
      setBodyRes(e.target.value);
      setCharacLeft('Minimum reached');
      setCharacLimit('');
    } else {
      setCharacLeft('');
      setCharacLimit('Character Limit Exceeded');
    }
  }

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
          </div>
          <div className="would-recommend">
            <div className="recommend-title">Do you recommend this product?</div>
            <label htmlFor="recommend-yes" className="recom-label">
              <input
                type="radio"
                name="recommend"
                value="yes"
                id="recommend-yes"
                className="recom-radio"
                onChange={(e) => (recommendClick(e))}
              />
              Yes
            </label>
            <label htmlFor="recommend-no" className="recom-label">
              <input
                type="radio"
                name="recommend"
                value="no"
                id="recommend-no"
                className="recom-radio"
                onChange={(e) => (recommendClick(e))}
              />
              No
            </label>
          </div>
          <SelectCharacteristics
            prodCharac={prodCharac}
            characObj={characObj}
            makeCharacObj={makeCharacObj}
          />
          <div className="add-rev-summary">
            <div className="rev-summary-label">Add a headline</div>
            <input className="rev-summary-input" type="text" placeholder="Example: Best purchase ever!" onChange={handleAddSummary} value={summaryRes} />
            {charExceed && <span className="char-exceeded">{charExceed}</span>}
          </div>
          <div className="add-rev-body">
            <div className="rev-body-label">Add a written review</div>
            <textarea className="rev-body-input" type="text" placeholder="Why did you like the product or not?" value={bodyRes} onChange={handleAddBody} />
            {characLeft && <span className="char-left">{characLeft}</span>}
            {characLimit && <span className="char-exceeded">{characLimit}</span>}
          </div>
        </form>
      </div>

    </div>
  );
}
