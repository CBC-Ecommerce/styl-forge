/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import CharacRadioRow from './CharacRadioRow.jsx';

// Example of row object:
// {id: 135224, charac: 'Fit', ratingMsg: Array(5), value: 0}
export default function CharacteristicRow({ row }) {
  return (
    <>
      <div className="characteristic-title">{row.charac}</div>
      <div className="char-meaning-row">
        {row.ratingMsg.map((meaning, index) => {
          const usrRating = index + 1;
          return (
            <CharacRadioRow
              meaning={meaning}
              usrRating={usrRating}
              name={row.charac}
              id={row.id}
              key={usrRating}
            />
          );
        })}
      </div>
    </>
  );
}