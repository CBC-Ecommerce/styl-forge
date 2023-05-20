import React from 'react';

export default function Droption({ item, index }) {
  return (
      <option id={index}>{item.size}</option>
  );
}
