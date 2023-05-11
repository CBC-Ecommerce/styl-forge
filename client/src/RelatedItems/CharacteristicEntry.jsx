import React from 'react';

function CharacteristicEntry({ feature }) {
  return (
    <tr>
      <td>{Object.values(feature)[0]}</td>
      <td>{Object.keys(feature)[0]}</td>
      <td>{Object.values(feature)[1]}</td>
    </tr>
  );
}
export default CharacteristicEntry;
