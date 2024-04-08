// SwitchButton.js
import React from 'react';

const SwitchButton = ({ defaultChecked, onToggle }) => {
  const handleChange = (e) => {
    onToggle(e.target.checked);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={defaultChecked} onChange={handleChange} />
      <span className="slider"></span>
    </label>
  );
};

export default SwitchButton;
