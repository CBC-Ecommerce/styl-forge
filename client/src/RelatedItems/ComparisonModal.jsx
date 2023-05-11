import React, { useState, useEffect } from 'react';
import CharacteristicsList from './CharacteristicsList.jsx';
import './css/modalStyle.css';

function ComparisonModal({ comparedId, id }) {
  return (
    <div className="modalBox">
      <div className="compModal">
        <h4>COMPARING</h4>
        <table>
          <thead>
            <tr>
              <th>Current Product Name</th>
              <th>Compared Product Name</th>
            </tr>
          </thead>
          <CharacteristicsList />
        </table>
      </div>
    </div>
  );
}
export default ComparisonModal;
