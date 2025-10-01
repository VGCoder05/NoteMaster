import { useState } from "react";
import TagInputUI from "./TagInputUI";

function TagInput({ tags, onChange }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const tagColors = {
    Work: "primary",
    Personal: "purple",
    Project: "blue",
    Finance: "green",
    Travel: "amber",
    Ideas: "orange",
  };

  const allTags = [
    "Work",
    "Personal",
    "Project",
    "Finance",
    "Travel",
    "Ideas",
    "Meeting",
    "Important",
    "Draft",
  ];

  const getTagColorClasses = (tag) => {
    const color = tagColors[tag] || "primary";
    const colorClasses = {
      primary: "bg-primary/10 dark:bg-primary/20 text-primary",
      blue: "bg-blue-500/10 dark:bg-blue-400/20 text-blue-500 dark:text-blue-400",
      purple:
        "bg-purple-500/10 dark:bg-purple-400/20 text-purple-500 dark:text-purple-400",
      amber:
        "bg-amber-500/10 dark:bg-amber-400/20 text-amber-500 dark:text-amber-400",
      green:
        "bg-green-500/10 dark:bg-green-400/20 text-green-500 dark:text-green-400",
      orange:
        "bg-orange-500/10 dark:bg-orange-400/20 text-orange-500 dark:text-orange-400",
    };
    return colorClasses[color];
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filtered = allTags.filter(
        (tag) =>
          tag.toLowerCase().includes(value.toLowerCase()) && !tags.includes(tag)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleAddTag = (tagToAdd) => {
    const trimmedTag = tagToAdd.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSuggestionClick = (suggestion) => {
    handleAddTag(suggestion);
  };

  return (
    <TagInputUI
      tags={tags}
      inputValue={inputValue}
      suggestions={suggestions}
      showSuggestions={showSuggestions}
      getTagColorClasses={getTagColorClasses}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onRemoveTag={handleRemoveTag}
      onSuggestionClick={handleSuggestionClick}
    />
  );
}

export default TagInput;
