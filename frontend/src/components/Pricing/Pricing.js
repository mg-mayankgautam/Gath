import React, { useEffect } from 'react'
import icon from '../../assets/icons/check2.svg';

const Pricing = () => {


    useEffect(() => {
            window.scrollTo(0, 0)
        }, [])

    return (
        <div className='bigscreen p-10 text-center'>
            <div className='text-[32px] font-semibold'>
                The best Indian footage license in the world
            </div>
            <div>
                Get unlimited footage downloads, full coverage on any platform worldwide and a lifetime license
            </div>

            <div className='flex items-end justify-center gap-9 mt-8 text-left'>

                <div className='cursor-pointer border-[0.5px] p-4 rounded-[16px] bg-white hover:shadow flex flex-col gap-6 w-full max-w-[240px]'
                    style={{ borderColor: 'var(--primary)' }}
                >
                    <div>Free</div>

                    <div>
                        <span className='text-2xl font-semibold'>₹ 0.00</span>
                        <span className='text-xs'> / month</span>
                    </div>

                    <div className='text-sm'>Great for trying out Shotkut and for tiny teams.</div>

                    <button className='greenButton mx-auto !bg-[transparent] border-2 border-black !w-[90%]'
                    // style={{borderColor:''}}
                    >
                        Try Now
                    </button>

                    <div className='bg-[#C9DBD2] text-[#333333] text-sm rounded-[4px] p-1 mx-auto'>
                        Features
                    </div>

                    <div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                    </div>
                </div>

                <div className='gradientcustom p-2 rounded-[16px] bg-[var(--primary)] hover:shadow flex flex-col gap-2 w-full max-w-[250px]'>
                    <div className='text-white text-xs text-center font-semibold'>Most Popular</div>

                    <div className='cursor-pointer border-[0.5px] p-4 rounded-[16px] bg-white flex flex-col gap-6 w-full max-w-[240px]'
                        style={{ borderColor: 'var(--primary)' }}
                    >
                        <div>Professional</div>

                        <div>
                            <span className='text-2xl font-semibold'>₹ 29.00</span>
                            <span className='text-xs'> / month</span>
                        </div>

                        <div className='text-sm'>Best for growing startups and growth companies.</div>

                        <button className='greenButton mx-auto !w-[90%]'
                        // style={{borderColor:''}}
                        >
                            Try Now
                        </button>

                        <div className='bg-[#C9DBD2] text-[#333333] text-sm rounded-[4px] p-1 mx-auto'>
                            Features
                        </div>

                        <div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>
                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className='cursor-pointer border-[0.5px] p-4 rounded-[16px] bg-white hover:shadow flex flex-col gap-6 w-full max-w-[240px]'
                    style={{ borderColor: 'var(--primary)' }}
                >
                    <div>Enterprise</div>

                    <div>
                        <span className='text-2xl font-semibold'>Negotiable</span>
                        <span className='text-xs'> </span>
                    </div>

                    <div className='text-sm'>Great for trying out Shotkut and for tiny teams.</div>

                    <button className='greenButton mx-auto !bg-[transparent] border-2 border-black !w-[90%]'
                    // style={{borderColor:''}}
                    >
                        Try Now
                    </button>

                    <div className='bg-[#C9DBD2] text-[#333333] text-sm rounded-[4px] p-1 mx-auto'>
                        Features
                    </div>

                    <div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Pricing