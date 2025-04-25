import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Video from '../HomePage/Video'
import { useTheme } from '../../context/ThemeProvider'
import TrendingSearch from '../HomePage/TrendingSearch'

const SearchPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { darkMode } = useTheme();

    const [filteredVideos, setFilteredVideos] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {

        const getData = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/videos/get`)

                console.log(data.data);
                setFilteredVideos(data.data);
                // setAllProducts(data.data);
            }
            catch (error) { console.log('There was an error getting the videos!', error); }
        }

        getData();

    }, [])

    return (
        <div className='bigscreen p-10'>

            <div className='flex flex-col gap-2 mb-20 text-center items-center'>
                <div className='text-4xl font-bold'>
                    Search Anything!
                </div>
                <div className='text-xl font-light mt-1'>
                    Access the broadest range of assets in one place.
                </div>

                <SearchInput />
            </div>

            <div className={showFilters ? "flex gap-4" : "flex gap-2"}>
                <div className={darkMode ? "FiltersDiv dark flex-grow" : "FiltersDiv flex-grow"}>

                    <div className=
                        {`font-medium cursor-pointer hover:text-[var(--primary)] ${showFilters && 'text-[var(--primary)]'}`} onClick={() => setShowFilters(!showFilters)}>
                        Video Themes
                    </div>
                    <div className="font-medium cursor-pointer hover:text-[var(--primary)]">Shot Types</div>
                    <div className="font-medium cursor-pointer hover:text-[var(--primary)]">People</div>
                    <div className="font-medium cursor-pointer hover:text-[var(--primary)]">Collections</div>
                    <div className="font-medium cursor-pointer hover:text-[var(--primary)]">Filmmakers</div>

                    <div className="mx-auto mt-auto flex flex-col">
                        <button className="greenButton mb-4">Start free now</button>
                        <Link to='/pricing' className="mx-auto"><button className="text-[var(--primary)] underline cursor-pointer text-center">Pricing</button></Link>
                    </div>

                </div>

                <div className={`FiltersDiv  ${darkMode ? "dark" : ""} ${showFilters ? "flex-grow" : "hide"}`}>

                    <Link to='/category/one'
                        className="font-medium cursor-pointer text-[var(--grey)] text-sm hover:text-[var(--primary)]"
                    >
                        Category 1
                    </Link>

                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {filteredVideos.length > 0 && filteredVideos.map((video) => (
                        <div key={video._id} className="aspect-[16/9]"> {/* Adjust aspect ratio as needed */}
                            <Video video={video} />
                        </div>
                    ))}
                </div>

            </div>


            <TrendingSearch/>


        </div>
    )
}

export default SearchPage