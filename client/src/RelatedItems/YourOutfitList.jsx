/* global localStorage */
import React, { useState } from 'react';
import Card from './Card.jsx';

function YourOutfitList({ id, setId }) {
  if (JSON.parse(localStorage.getItem('outfits')) === null) {
    localStorage.setItem('outfits', JSON.stringify([]));
  }
  const [outfits, setOutfits] = useState(JSON.parse(localStorage.getItem('outfits')));

  function addClickHandler() {
    // console.log('add to outfits is clicked');
    const currentList = JSON.parse(localStorage.getItem('outfits'));
    if (currentList.indexOf(id) > -1) return;
    setOutfits([...outfits, id]);
    localStorage.removeItem('outfits');
    localStorage.setItem('outfits', JSON.stringify([...outfits, id]));
  }
  return (
    <div className="cardContainer">
      <div className="card"><span onClick={addClickHandler}>+ Add to Outfits</span></div>
      {outfits.map((productId) => <Card id={productId} key={productId} setId={setId} />)}
    </div>
  );
}

export default YourOutfitList;
