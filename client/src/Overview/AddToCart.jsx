import React, { useState } from 'react';

export default function AddToCart({ selectedStyle }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState('');
  const [quantityArray, setQuantityArray] = useState([]);
  const { skus } = selectedStyle;

  // create object of sizes: quantities
  let availableItems = Object.values(skus);

  const handleChange = function (e) {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute('id');
    let { quantity } = availableItems[option];
    const tempQuantityArray = [];

    setSelectedSize(e.target.value);
    setSelectedQty(1);
    quantity = (quantity > 15) ? 15 : quantity;

    for (let i = 1; i <= quantity; i++) {
      tempQuantityArray.push(i);
    }
    setQuantityArray(tempQuantityArray);
  };
  return (
    <div className="add-to-cart" data-testid="add2Cart">
      <select className="dropdn-btn" value={selectedSize} onChange={handleChange} data-testid="selectDrop">
        <option value="" defaultValue>Select Size</option>
        {availableItems.map((item, index) => (
          <option id={index}>{item.size}</option>
        ))}
      </select>
      <select className="dropdn-btn" data-testid="qtyDrop" value={selectedQty} onChange={(e) => setSelectedQty(e.target.value)}>
        {selectedSize ? (
          quantityArray.map((quantity) => (
            <option value={quantity}>{quantity}</option>
          ))) : (
            <option value="-" defaultValue>-</option>
        )}
      </select>
      <button className="add-to-cart-button" type="button" data-testid="add2CartBtn">Add to cart</button>
    </div>
  );
}
