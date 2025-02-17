import React from 'react'
import './HomePage.css'
import Banner from './Banner'
import Collection from './Collection'
import CollectionSlider from './CollectionSlider'

const HomePage = ({searchQuery, setSearchQuery}) => {
  return (
    <div className='bigscreen'>
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      <Collection/>

      <CollectionSlider/>
    </div>
  )
}

export default HomePage