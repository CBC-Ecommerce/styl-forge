import React, { useState, useEffect } from 'react';
import CharacteristicEntry from './CharacteristicEntry.jsx';

function CharacteristicsList({ comparedId, id }) {
  return (
    <tbody>
      <CharacteristicEntry />
    </tbody>
  );
}
export default CharacteristicsList;
