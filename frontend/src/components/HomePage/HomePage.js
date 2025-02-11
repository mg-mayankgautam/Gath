import React from 'react'
import './HomePage.css'
import Banner from './Banner'
import Collection from './Collection'

const HomePage = ({searchQuery, setSearchQuery}) => {
  return (
    <div className='bigscreen'>
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      <Collection/>
    </div>
  )
}

export default HomePage