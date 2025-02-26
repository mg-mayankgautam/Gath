import React from 'react'

const Pricing = () => {
    return (
        <div className='bigscreen p-10 text-center'>
            <div className='text-[32px] font-semibold'>
                The best Indian footage license in the world
            </div>
            <div>
                Get unlimited footage downloads, full coverage on any platform worldwide and a lifetime license
            </div>

            <div className='flex items-end justify-center gap-9 mt-8 text-left'>

                <div className='border-[0.5px] p-4 rounded-[16px] bg-white shadow flex flex-col gap-6 w-full max-w-[240px]'
                    style={{ borderColor: 'var(--primary)' }}
                >
                    <div>Free</div>

                    <div>
                        <span className='text-2xl font-semibold'>₹ 0.00</span>
                        <span className='text-xs'> / month</span>
                    </div>

                    <div className='text-sm'>Great for trying out Shotkut and for tiny teams.</div>

                    <button className='greenButton !bg-[transparent] border-2 border-black !w-[90%]'
                    // style={{borderColor:''}}
                    >
                        Try Now
                    </button>

                    <div className='bg-[#C9DBD2] text-[#333333] text-sm rounded-[4px] p-1 mx-auto'>
                        Features
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Pricing