import React, { useState } from 'react'
import profile from '../../assets/sampleprofile.png'
import { useTheme } from '../../context/ThemeProvider';

const CustomerDashboard = () => {

    const { darkMode } = useTheme();

    const [activeTab, setActiveTab] = useState('downloads');


    return (
        <div className='min-h-screen'>

            <div className='bigscreen p-10 flex items-center w-full justify-between'>

                <div className='flex gap-6 h-20'>

                    <div className='h-full w-20'>
                        <img src={profile} alt='profile' className='h-full w-full object-cover rounded-lg' />
                    </div>

                    <div className='flex flex-col justify-center gap-2'>
                        <div className='font-semibold text-2xl'>
                            Name
                        </div>
                        <div className='text-[var(--grey)] text-xl'>
                            user.name@gmail.com
                        </div>
                    </div>

                </div>

                <button className='greenButton flex gap-2'>
                    {/* <img src={} alt='download' className='h-full object-contain'/> */}
                    Edit Profile
                </button>
            </div>


            <div className={darkMode ? 'line !bg-[#3D413E]' : 'line'}></div>




            <div className='bigscreen p-10 mt-2'>

                <div className="flex">
                    {[
                        { id: 'downloads', label: 'Download History' },
                        { id: 'collections', label: 'My Collections' },
                        { id: 'saved', label: 'Saved Clips' }
                    ].map((tab) => (
                        <div
                            key={tab.id}
                            className={`py-2 px-4 font-medium focus:outline-none border-b-2 cursor-pointer transition-all duration-250 ease-in-out ${activeTab === tab.id
                                ? 'text-[var(--primary)] border-[var(--primary)]'
                                : 'text-[var(--grey)] hover:text-black border-transparent'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="py-10">

                    <p>No clips yet</p>

                </div>
            </div>

        </div>
    )
}

export default CustomerDashboard