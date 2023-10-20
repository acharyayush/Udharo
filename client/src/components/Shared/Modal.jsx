import React, { useState } from "react";
const Modal = ({ title, setIsVisible, btnVal, className, children }) => {
  return (
    <div className={className}>
      <h1 className="title">{title}</h1>
      {children}
      <div className="btns">
        <button
          type="button"
          className="cancelBtn btn"
          onClick={() => {setIsVisible(false)}}
        >
          Cancel
        </button>
        <button type="submit" className="btn">
          {btnVal}
        </button>
      </div>
    </div>
  );
};

export default Modal;
