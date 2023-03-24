import React, { useEffect, useRef, useState } from "react";

const SelectColor = ({ color, deleteColor }) => {
  const [options, setOptions] = useState([
    { id: 1, value: "red", label: "Red" },
    { id: 2, value: "green", label: "Green" },
    { id: 3, value: "blue", label: "Blue" },
    { id: 4, value: "#ffffff87", label: "White" },
    { id: 5, value: "orange", label: "Orange" },
    { id: 6, value: "#78270e", label: "Brown" },
  ]);
  const [optionSelected, setOptionSelected] = useState();
  const colorInput = useRef();

  useEffect(() => {
    const updatedOptions = options.filter(
      (option) => option.value !== optionSelected
    );
    setOptions(updatedOptions);
  }, [deleteColor]);

  const handleSelectChange = (e) => {
    const selectColor = e.target.value;
    setOptionSelected(selectColor);
    color(selectColor);
  };

  return (
    <select defaultValue={"DEFAULT"} ref={colorInput} onChange={handleSelectChange}>
      <option value={"DEFAULT"}>Select color</option>
      {options.map((option) => (
        <option
          style={{ backgroundColor: option.value }}
          key={option.id}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectColor;
