import React, { useEffect } from 'react'
import './HomePage.css'
import Banner from './Banner'
import Collection from './Collection'
import CollectionSlider from './CollectionSlider'
import TrendingSearch from './TrendingSearch'

const HomePage = ({ searchQuery, setSearchQuery }) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='bigscreen'>
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Collection />

      <TrendingSearch />

      <CollectionSlider />
    </div>
  )
}

export default HomePage