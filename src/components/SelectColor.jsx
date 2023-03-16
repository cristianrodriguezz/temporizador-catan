import React, { useRef } from "react";
import { colors } from "../constants/colors.js";

const SelectColor = ( {color} ) => {
  const colorInput = useRef();

  const handleChange = () => {
    color(colorInput.current.value)
  }

  return (
    <label>
      <select
        name="select"
        id="color"
        defaultValue={"DEFAULT"}
        ref={colorInput}
        onChange={handleChange}
      >
        <option hidden value="DEFAULT">
          Select color
        </option>
        <option value={colors.red}>Red</option>
        <option value={colors.blue}>Blue</option>
        <option value={colors.white}>White</option>
        <option value={colors.orange}>Orange</option>
        <option value={colors.green}>Green</option>
        <option value={colors.brown}>Brown</option>
      </select>
    </label>
  );
};

export default SelectColor;
