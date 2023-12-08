import React from 'react';
import './AlertDialog.css';

const AlertDialog = ({ message, onClose }) => {
  return (
    <div className="dialog">
      <p>{message}</p>
      <button className="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AlertDialog;
