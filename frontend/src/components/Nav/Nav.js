import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import './Nav.css';
import logo from '../../assets/logo.png';
import icon from '../../assets/icons/search.png';

const Nav = ({ searchQuery, setSearchQuery }) => {

  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  const handleSearch = (query) => {
    setInput(query);
    // console.log(query);
    if (query.trim() === "") {
      setSuggestions([]); // Hide suggestions if the search query is empty
    } else {
      const filteredSuggestions = uniqueKeywords.filter(keyword =>
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
        setMenuOpen(false)
      }
    }, 500); // Short delay to allow suggestion click
  };


  return (
    <>
    <div className='Nav'>
      <div className='navLogo'>
        <img src={logo} className='object-contain'/>
      </div>

      <div className='hidden md:block navSearchDiv relative'>
        <input className='navSearch'
          placeholder='What are you looking for?'
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <img src={icon} className='absolute my-auto right-1 cursor-pointer top-1 bottom-1' />

        {suggestions.length > 0 && (
          <div className="suggestions-dropdown"
            onMouseDown={() => setIsFocused(false)}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item relative"
                onClick={() => {
                  setSearchQuery(suggestion);
                }}
              >
                <GoSearch className='absolute inset-0 my-auto left-3' />
                {suggestion}
              </div>
            ))}
          </div>
        )}

      </div>

      <div className='hidden md:flex gap-6 items-center ml-auto'>
        <div className='navBtn'>Pricing</div>
        <div className='navBtn'>Sign In</div>
      </div>

      <FiMenu
        className="md:hidden text-2xl text-white cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-12 left-0 w-full bg-black shadow-lg flex flex-col items-start p-4 space-y-2 md:hidden">

          <div className='block md:hidden navSearchDiv relative'>
            <input className='navSearch w-full'
              placeholder='Search'
              value={input}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <GoSearch className='absolute inset-0 my-auto left-3' />

            {suggestions.length > 0 && (
              <div className="suggestions-dropdown"
                onMouseDown={() => setIsFocused(false)}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item relative"
                    onClick={() => {
                      setSearchQuery(suggestion);
                    }}
                  >
                    <GoSearch className='absolute inset-0 my-auto left-3' />
                    {suggestion}
                  </div>
                ))}
              </div>
            )}

          </div>

          <button className="w-full text-left px-4 py-2 rounded-lg text-[rgba(255,255,255,0.541)] bg-transparent hover:text-white">
            Join
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-[rgba(255,255,255,0.541)] bg-transparent hover:text-white">
            Contact
          </button>
          {/* Sign In Button */}
          <button className="w-full text-left px-4 py-2 bg-[rgb(255,173,143)] text-black rounded-lg hover:bg-[rgb(252,185,161)]">
            Sign In
          </button>
        </div>
      )}

    </div>

    <div className='navStrip h-10 px-10 flex items-center justify-evenly text-white text-sm'>
      <div className='cursor-pointer'>Video Themes</div>
      <div className='cursor-pointer'>Shot Types</div>
      <div className='cursor-pointer'>People</div>
      <div className='cursor-pointer'>Collections</div>
      <div className='cursor-pointer'>Filmmakers</div>
    </div>

    </>
  )
}

export default Nav

const uniqueKeywords = [
  "alta", "katori", "bowl", "red", "henna", "durga", "pooja", "pujo",
  "chana", "masala", "rice", "indian", "spices", "dhania", "basmati",
  "chickpeas", "bottle gourd", "farm", "crop", "harvest", "farming",
  "vegetable", "green", "fields", "vine", "mother earth", "leaves",
  "cucumber", "box", "stack", "sorting facility", "farmers market",
  "farmer", "plucking", "man", "field", "greenery", "trees", "indian fruits",
  "farmers", "walking", "farm field", "indian man", "dal tadka", "lentils",
  "coriander", "red chilly", "standing", "smiling", "sunset", "river",
  "bridge", "india", "howrah", "slow motion", "river bank", "photos",
  "street park", "taxi cars", "lights", "decorated", "decorated street",
  "fairy lights", "crowd", "christmas", "pile of cucumber", "stacked vegetables",
  "sorting", "healthy", "water",
  "Rituals", "Food", "Agriculture", "Nature", "Festival"
];