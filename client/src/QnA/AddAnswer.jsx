import React from 'react';

function AddAnswer({}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Modal title</h4>
        </div>
        <div className="modal-body">
          This is modal content
        </div>
        <div className="modal-footer">
          <button type="button" className="button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddAnswer;
