import React from 'react'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='mt-20 bg-white'>
            <div className='bigscreen grid grid-cols-3 gap-4 px-10 py-14'>

                <div>
                    <div className='navLogo'>
                        <img src={logo} className='object-contain h-full' />
                    </div>
                </div>


                <div className='flex flex-col'>
                    <div className='font-semibold mb-6'>Quick Links</div>

                    <Link to='/pricing'>Pricing</Link>
                    <Link to='/category/one'>Categories</Link>
                    
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