import React from 'react'
import './HomePage.css'
import Banner from './Banner'

const HomePage = ({searchQuery, setSearchQuery}) => {
  return (
    <div className='bigscreen'>
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    </div>
  )
}

export default HomePage