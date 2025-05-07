import React, { useState, useRef, useEffect } from "react";
import icon from "../../assets/icons/search1.png";
import { Link, useNavigate } from "react-router-dom";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    performSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const performSearch = () => {
    console.log("Search function was called in React!", input);
    if (input) {
      navigate(`/search?term=${encodeURIComponent(input)}`);
      setIsDropdownOpen(false); // Close dropdown after search
    } else {
      console.log("Input is empty, not navigating.");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Search function was called in React!", suggestion);
    setInput(suggestion);
    navigate(`/search?term=${encodeURIComponent(suggestion)}`);
    setIsDropdownOpen(false); // Close dropdown after selecting suggestion
  };

  const handleSearch = (query) => {
    setInput(query);
    if (query.trim() === "") {
      setSuggestions([]);
      setIsDropdownOpen(false);
    } else {
      const filteredSuggestions = uniqueKeywords.filter((keyword) =>
        keyword.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsDropdownOpen(true); // Open dropdown when there are suggestions
    }
  };

  const handleFocus = () => {
    if (input && suggestions.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div className="navSearchDiv relative mt-0" ref={dropdownRef}>
      <input
        ref={inputRef}
        className="navSearch placeholder-gray-700"
        placeholder="What are you looking for?"
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      <img
        src={icon}
        onClick={handleSearchClick}
        className="absolute my-auto right-1 cursor-pointer top-1 bottom-1"
        alt="Search"
      />

      {isDropdownOpen && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item relative"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img
                src={icon}
                className="absolute my-auto right-1 cursor-pointer top-1 bottom-1"
                alt="Search Icon"
              />
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;

const uniqueKeywords = [
  "alta",
  "katori",
  // ... rest of your keywords
];