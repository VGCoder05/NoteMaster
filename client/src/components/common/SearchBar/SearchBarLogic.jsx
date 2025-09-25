import { useState, useEffect } from "react";
import SearchBarUI from "./SearchBarUI";

function SearchBar({ value="", onChange, placeholder = "Search..." }) {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <SearchBarUI
      value={localValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClear={handleClear}
      isFocused={isFocused}
      placeholder={placeholder}
      showClear={localValue.length > 0}
    />
  );
}

export default SearchBar;
