import React, { useState } from 'react';

export default function AddToCart({ selectedStyle }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantityArray, setQuantityArray] = useState([]);
  const [selectedQty, setSelectedQty] = useState(0);
  const { skus } = selectedStyle;

  // create object of sizes: quantities
  let availableItems = Object.values(skus);
  console.log('availableItems:', availableItems);

  const handleChange = function (e) {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute('id');
    let { quantity } = availableItems[option];
    const tempQuantityArray = [];

    setSelectedSize(e.target.value);
    quantity = (quantity > 15) ? 15 : quantity;

    for (let i = 1; i <= quantity; i++) {
      tempQuantityArray.push(i);
    }
    setQuantityArray(tempQuantityArray);
  };
  return (
    <div className="add-to-cart">
      <select className="dropdn-btn" value={selectedSize} onChange={handleChange}>
        <option value="" disabled defaultValue>Select Size</option>
        {availableItems.map((item, index) => (
          <option id={index}>{item.size}</option>
        ))}
      </select>
      <select className="dropdn-btn">
        {selectedSize ? (
          quantityArray.map((quantity) => (
            <option>{quantity}</option>
          ))) : (
            <option value="" disabled selected>-</option>
        )}
      </select>
      <button className="add-to-cart-button" type="button">Add to cart</button>
    </div>
  );
}
