import React from "react";

function PopupDelete({ handleDeleteTrue, handleDeleteFalse }) {
  return (
    <div className="div-popup-delete">
      <div className="modal-dialog " style={{}}>
        <div className="modal-content popup-delete">
          <div className="modal-header">
            <h5 className="modal-title">Delete Employee</h5>
          </div>

          <div className="modal-body">
            <p>You sure you wanna delete?</p>
          </div>

          <div className="modal-footer">
            <button onClick={handleDeleteFalse} className="btn btn-primary">
              Cancel
            </button>
            <button onClick={handleDeleteTrue} className="btn btn-secondary">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupDelete;
