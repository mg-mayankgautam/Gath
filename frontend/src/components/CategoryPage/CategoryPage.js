import React, { useEffect } from 'react'
import CollectionSlider from '../HomePage/CollectionSlider'
import TrendingSearch from '../HomePage/TrendingSearch'
import Collection from '../HomePage/Collection'

const CategoryPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='bigscreen'>
            <CollectionSlider />

            <div className='mt-12'></div>

            <TrendingSearch />

            <div className='mb-10'></div>

            <Collection />
        </div>
    )
}

export default CategoryPage