import React, { useState } from 'react'
import img from '../../assets/home/banner.webp'
import { Link } from 'react-router-dom';
import SearchInput from '../SearchPage/SearchInput';

const Banner = () => {

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

                <SearchInput />
            </div>

            <div className='absolute bottom-10 right-10 left-[65%] flex items-center gap-8'>
                <button className="greenButton flex-grow">Start free now</button>
                <Link to='/pricing' className='flex-grow'><button className="button !w-full">Pricing</button></Link>
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