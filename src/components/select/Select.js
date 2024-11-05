import React from "react";
import "./Select.css";

const Select = ({ options, value, onChange, label }) => {
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select className="custom-select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
