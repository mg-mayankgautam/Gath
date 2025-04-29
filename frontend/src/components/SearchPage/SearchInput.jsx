import React, { useState } from "react";
import icon from "../../assets/icons/search1.png";
import { Link,useNavigate } from "react-router-dom";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
    const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchClick = () => {
    console.log("Search function was called in React!", input);
    if (input) {
      navigate(`/search?term=${encodeURIComponent(input)}`);
    } else {
      // Optionally handle the case where the input is empty
      console.log("Input is empty, not navigating.");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Search function was called in React!", suggestion);
    setInput(suggestion);
    navigate(`/search?term=${encodeURIComponent(suggestion)}`);
  };

  const handleSearch = (query) => {
    setInput(query);
    // console.log(query);
    if (query.trim() === "") {
      setSuggestions([]); // Hide suggestions if the search query is empty
    } else {
      const filteredSuggestions = uniqueKeywords.filter((keyword) =>
        keyword.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Set a timeout to give time to click the suggestion before hiding
    setTimeout(() => {
      if (!isFocused) {
        setSuggestions([]); // Hide suggestions if input loses focus
      }
    }, 500); // Short delay to allow suggestion click
  };

  return (
    <div className="navSearchDiv relative mt-8">
      <input
        className="navSearch placeholder-gray-700"
        placeholder="What are you looking for?"
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <img
        src={icon}
        onClick={handleSearchClick}

        className="absolute my-auto right-1 cursor-pointer top-1 bottom-1"
      />

      {suggestions.length > 0 && (
        <div
          className="suggestions-dropdown"
          onMouseDown={() => setIsFocused(false)}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item relative"
              onClick={(e)=>handleSuggestionClick(suggestion)}

            >
              <img
                src={icon}
                className="absolute my-auto right-1 cursor-pointer top-1 bottom-1"
                alt="Search Icon" // It's good practice to include alt text for accessibility
              />{" "}
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
  "bowl",
  "red",
  "henna",
  "durga",
  "pooja",
  "pujo",
  "chana",
  "masala",
  "rice",
  "indian",
  "spices",
  "dhania",
  "basmati",
  "chickpeas",
  "bottle gourd",
  "farm",
  "crop",
  "harvest",
  "farming",
  "vegetable",
  "green",
  "fields",
  "vine",
  "mother earth",
  "leaves",
  "cucumber",
  "box",
  "stack",
  "sorting facility",
  "farmers market",
  "farmer",
  "plucking",
  "man",
  "field",
  "greenery",
  "trees",
  "indian fruits",
  "farmers",
  "walking",
  "farm field",
  "indian man",
  "dal tadka",
  "lentils",
  "coriander",
  "red chilly",
  "standing",
  "smiling",
  "sunset",
  "river",
  "bridge",
  "india",
  "howrah",
  "slow motion",
  "river bank",
  "photos",
  "street park",
  "taxi cars",
  "lights",
  "decorated",
  "decorated street",
  "fairy lights",
  "crowd",
  "christmas",
  "pile of cucumber",
  "stacked vegetables",
  "sorting",
  "healthy",
  "water",
  "Rituals",
  "Food",
  "Agriculture",
  "Nature",
  "Festival",
];
