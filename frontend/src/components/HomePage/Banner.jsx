import React, { useState } from 'react'
import img from '../../assets/home/banner.webp'
import img1 from '../../assets/home/bannermobile.png'
import { Link } from 'react-router-dom';
import SearchInput from '../SearchPage/SearchInput';
import SignUp from '../SignUp/SignUp';

const Banner = () => {

      const [showSignInModal, setShowSignInModal] = useState(false);
      const [showSignUpModal, setShowSignUpModal] = useState(false);

    return (
        <div className='relative overflow-hidden'>
            <img src={img} className='hidden lg:block object-contain h-full w-full px-5 py-4 lg:px-10 lg:py-8 rounded-xl object-right' />
            <img src={img1} className='lg:hidden object-cover lg:object-contain h-[calc(100vh-80px)] w-full p-0 object-center' />
            {/* <img src={img} className='object-cover lg:object-contain h-[calc(100vh-80px)] lg:h-full w-full px-5 py-4 md:px-10 lg:py-8 rounded-xl object-right' /> */}

            <div className='h-full absolute inset-0 px-8 md:px-10 flex flex-col justify-center items-center text-white text-center'>
                <div className='text-4xl md:text-5xl font-bold'>
                    Get Unlimited Stock Footage
                </div>
                <div className='md:text-xl font-light mt-1 mb-8'>
                    Access the broadest range of assets in one place.
                </div>

                <SearchInput />
            </div>

            <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 lg:left-[65%] flex items-center gap-2 sm:gap-8'>
                <button className="greenButton flex-grow"
                            onClick={() => setShowSignUpModal(true)}

                >Start free now</button>
                {showSignUpModal && <SignUp setShowModal={setShowSignUpModal} />}
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