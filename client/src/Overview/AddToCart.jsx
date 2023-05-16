import React, { useState } from 'react';
import axios from 'axios';

export default function AddToCart({ selectedStyle }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState('');
  const [selectedSku, setSelectedSku] = useState('');
  const [quantityArray, setQuantityArray] = useState([]);
  const { skus } = selectedStyle;

  // create object of sizes: quantities
  let availableItems = Object.values(skus);
  let availableItemSkus = Object.keys(skus);
  const handleChange = function (e) {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute('id');
    let { quantity } = availableItems[option];
    const tempQuantityArray = [];
    setSelectedSize(e.target.value);
    setSelectedQty(1);
    setSelectedSku(availableItemSkus[index]);
    quantity = (quantity > 15) ? 15 : quantity;

    for (let i = 1; i <= quantity; i++) {
      tempQuantityArray.push(i);
    }
    setQuantityArray(tempQuantityArray);
  };

  const addToCartClicked = function () {
    if (selectedSize === '') {
      alert('Select a size and quantity');
    } else {
      // make axios request to cart: sku_id = selectedSku, selectedQty as number of requests to send
      for (let i = 0; i < selectedQty; i++) {
        axios.post('cart/', {
          sku_id: selectedSku,
        })
          .then((res) => console.log(res))
          .catch((err) => console.log('error:', err.message));
      }
    }
    // reset selectSize and selectQty
    setSelectedSize('');
    setSelectedQty('');
  };
  return (
    <div className="add-to-cart" data-testid="add2Cart">
      <select className="dropdn-btn" id="sizeDropdown" value={selectedSize} onChange={handleChange} data-testid="selectDrop">
        <option value="" defaultValue>Select Size</option>
        {availableItems.map((item, index) => {
          if (availableItems[index].quantity > 0) {
            return <option id={index}>{item.size}</option>;
          } else {
            return <option disabled>{item.size} Out of Stock</option>
          }
        })}
      </select>
      <select className="dropdn-btn" data-testid="qtyDrop" value={selectedQty} onChange={(e) => setSelectedQty(e.target.value)}>
        {selectedSize ? (
          quantityArray.map((quantity) => (
            <option value={quantity}>{quantity}</option>
          ))) : (
            <option value="" defaultValue>-</option>
        )}
      </select>
      <button className="add-to-cart-button" type="button" data-testid="add2CartBtn" onClick={addToCartClicked}>Add to cart</button>
    </div>
  );
}
