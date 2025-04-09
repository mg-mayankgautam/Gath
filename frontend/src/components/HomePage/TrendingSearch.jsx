import React from 'react'
import { useTheme } from '../../context/ThemeProvider';

const TrendingSearch = () => {

    const {darkMode} = useTheme();

    return (

        <div className="flex justify-center mt-10 items-center gap-10">
            <div className="text-[var(--grey)] text-sm">Trending Searches:</div>
            <button className={darkMode? "lightGreenButton dark" : "lightGreenButton"}>🔥 background</button>
            <button className={darkMode? "lightGreenButton dark" : "lightGreenButton"}>🔥 AI</button>
            <button className={darkMode? "lightGreenButton dark" : "lightGreenButton"}>🔥 abstract</button>
            <button className={darkMode? "lightGreenButton dark" : "lightGreenButton"}>🔥 3D particles</button>
        </div>
    )
}

export default TrendingSearch