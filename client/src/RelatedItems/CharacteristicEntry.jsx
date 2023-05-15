import React from 'react';

function CharacteristicEntry({ feature }) {
  return (
    <tr>
      <td className="comp-td">{Object.values(feature)[0][0] === 'true' ? '&#10003;' : Object.values(feature)[0][0]}</td>
      <td className="comp-td modal-features">{Object.keys(feature)[0]}</td>
      <td className="comp-td">{Object.values(feature)[0][1] === 'true' ? '&#10003;' : Object.values(feature)[0][1]}</td>
    </tr>
  );
}
export default CharacteristicEntry;
