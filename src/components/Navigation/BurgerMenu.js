// BurgerMenu.js
import React from 'react';

const BurgerMenu = ({ setIsActive, isActive }) => {
  return (
    <div
      className={`burger-menu ${isActive ? 'open' : ''}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default BurgerMenu;
