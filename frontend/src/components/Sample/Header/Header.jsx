import React from 'react'
import './Header.css'

const Header = ({ searchQuery, setSearchQuery }) => {
    return (
        <>
            {searchQuery == "" ?
                <div className='Header bg'>
                    <div className='headerMain'><span className='purple'>Editable</span> Video Templates</div>
                    <div className='headerText'>
                        Access premium templates for video editing and motion design. From dynamic openers to logo stings, product promos, and more, we have everything you need to create polished videos.
                    </div>

                    <div className='headerBtns'>
                        <div className='headerBtn'
                            onClick={() => setSearchQuery("Christmas")}
                        >
                            Christmas
                        </div>
                        <div className='headerBtn'
                            onClick={() => setSearchQuery("Bridge")}
                        >
                            Bridge
                        </div>
                        <div className='headerBtn'
                            onClick={() => setSearchQuery("Green")}
                        >
                            Green
                        </div>
                    </div>
                </div>
                :
                <div className='Header !text-left !items-start'>
                    <div className='headerMain'><span className='purple'>{searchQuery}</span> Assets</div>
                    <div className='headerText'>
                        Access premium templates for video editing and motion design. From dynamic openers to logo stings, product promos, and more, we have everything you need to create polished videos.
                    </div>

                    <div className='headerBtns'>
                        <div className='headerBtn'
                            onClick={() => setSearchQuery("")}
                        >
                            Back to All Items
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Header