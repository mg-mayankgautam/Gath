import React, { useState } from 'react'
import img from '../../assets/home/banner.webp'
import icon from '../../assets/icons/search1.png';

const Banner = ({ searchQuery, setSearchQuery }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

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
            }
        }, 500); // Short delay to allow suggestion click
    };


    return (
        <div className='relative'>
            <img src={img} className='object-contain h-full w-full px-10 py-8' />

            <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center'>
                <div className='text-5xl font-bold'>
                    Get Unlimited Stock Footage
                </div>
                <div className='text-xl font-light mt-1'>
                    Access the broadest range of assets in one place.
                </div>

                <div className='navSearchDiv relative mt-8'>
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
                                    <img src={icon} className='absolute inset-0 my-auto left-3' />
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <div className='absolute bottom-10 right-10 left-[65%] flex items-center gap-8'>
                <button className="greenButton flex-grow">Start free now</button>
                <button className="button flex-grow">Pricing</button>
            </div>
        </div>
    )
}

export default Banner

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