import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicStarList from './DynamicStarList.jsx';

export default function AddReview({id, toggleModal}) {
  const [prodName, setProdName] = useState('');

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
        <form>
          <div className="overall-stars">
            <div className="overall-label">Overall Rating</div>
            <DynamicStarList />
          </div>
        </form>
      </div>

    </div>
  );
}
