import React from 'react'
import logo from '../../assets/logo.png';


const Footer = () => {
    return (
        <div className='mt-20 bg-white'>
            <div className='bigscreen grid grid-cols-3 gap-4 px-10 py-10'>

                <div>
                    <div className='navLogo'>
                        <img src={logo} className='object-contain h-full' />
                    </div>
                </div>


                <div>
                    <div className='font-semibold mb-6'>Use Cases</div>

                    <div className='cursor-pointer'>UI Design</div>
                    <div className='cursor-pointer'>UX Design</div>
                    <div className='cursor-pointer'>Wireframing</div>
                    <div className='cursor-pointer'>Diagramming</div>
                    <div className='cursor-pointer'>Brainstorming</div>
                    <div className='cursor-pointer'>Online Whiteboard</div>
                    <div className='cursor-pointer'>Team Collaboration</div>
                </div>


                <div className='mr-auto'>
                    <div className='font-semibold mb-6'>Explore</div>

                    <div className='cursor-pointer'>Design</div>
                    <div className='cursor-pointer'>Prototyping</div>
                    <div className='cursor-pointer'>Development Features</div>
                    <div className='cursor-pointer'>Design Systems</div>
                    <div className='cursor-pointer'>Collaboration Features</div>
                    <div className='cursor-pointer'>Design Process</div>
                    <div className='cursor-pointer'>Figjam</div>
                </div>

            </div>
        </div>
    )
}

export default Footer