import React from 'react'
import logo from '../../assets/logo.png';
import logowhite from '../../assets/logowhite.png';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeProvider';


const Footer = () => {

    const { darkMode } = useTheme();

    return (
        <div className={darkMode ? 'mt-20 bg-[#080E0B] text-[var(--grey)]' : 'mt-20 bg-white'}>
            <div className='bigscreen grid grid-cols-3 gap-4 px-10 py-14'>

                <div>
                    <div className='navLogo'>
                        <img src={darkMode ? logowhite : logo} className='object-contain h-full' />

                    </div>
                </div>


                <div className='flex flex-col'>
                    <div className='font-semibold mb-6'>Links</div>

                    <Link to='/about'>About Us</Link>
                    <Link to='/pricing'>Our Pricing & Plans</Link>
                    <Link to='/'>FAQs</Link>
                    {/* <Link to='/category/one'>Categories</Link> */}

                </div>


                <div className='mr-auto flex flex-col'>
                    <div className='font-semibold mb-6'>Legal</div>

                    <Link to='/privacypolicy'>Privacy Policy</Link>
                    <Link to='/termsandconditions'>Terms and Conditions</Link>
                    <Link to='/refundpolicy'>Cancellation and Refund</Link>

                </div>

            </div>
        </div>
    )
}

export default Footer