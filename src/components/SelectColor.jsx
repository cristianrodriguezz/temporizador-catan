import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Contexts/ContextProvider";
import { colors } from "../constants/color";

const SelectColor = ({ color, isDeleteColor }) => {
  const [options, setOptions] = useState(colors);
  const [optionSelected, setOptionSelected] = useState();
  const colorInput = useRef();
  const { colorsDeletes, setColorsDeletes } = useContext(Context);


  useEffect(() => {

    const updatedOptions = options.filter(
      (option) => option.value !== optionSelected
    );
    setOptions(updatedOptions);

  }, [isDeleteColor]);

  useEffect(() => {
        
    if (colorsDeletes) {

      const addColor = colorsDeletes[0];
      setOptions([...options, addColor]);

    }
    setColorsDeletes(false)
  
  }, [colorsDeletes])
  

  const handleSelectChange = (e) => {
    let selectColor = e.target.value;
    setOptionSelected(selectColor);
    color(selectColor);
  };

  return (
    <select
      defaultValue={"DEFAULT"}
      ref={colorInput}
      onChange={handleSelectChange}
    >
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
