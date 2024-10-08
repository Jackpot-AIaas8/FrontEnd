import React from "react";

const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      className="input"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      required
    />
  );
};

export default InputField;
