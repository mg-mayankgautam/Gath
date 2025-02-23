import React, { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import Video from "./Video";
import axios from "axios";


const Collection = ({ searchQuery, setSearchQuery }) => {

  const [filteredVideos, setFilteredVideos] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortOrder, setSortOrder] = useState("Ascending");

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


  const handleFilterChange = (category) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };

  // .filter((video) =>
  //   (selectedFilters.length === 0 ||
  //     selectedFilters.every((filter) => video.categories.includes(filter))) &&
  //   (video.categories.some((category) =>
  //     category?.toLowerCase()?.includes(searchQuery.toLowerCase())
  //   ) || video.keywords.some((keyword) =>
  //     keyword?.toLowerCase()?.includes(searchQuery.toLowerCase())
  //   ))
  // )
  // .sort((a, b) => {
  //   if (sortOrder === "Ascending") {
  //     return a.src.localeCompare(b.src);
  //   } else {
  //     return b.src.localeCompare(a.src);
  //   }
  // });


  return (
    <>

      <div className="Home">

        <div className={showFilters ? "flex gap-4 md:gap-10 mt-0" : "flex mt-0"}>

          <div className={showFilters ? "FiltersDiv" : "FiltersDiv hide"}>

            <div className="font-medium">Video Themes</div>
            <div className="font-medium">Shot Types</div>
            <div className="font-medium">People</div>
            <div className="font-medium">Collections</div>
            <div className="font-medium">Filmmakers</div>

            <div className="mx-auto mt-auto">
              <div className="greenButton mb-4">Start free now</div>
              <div className="text-[var(--primary)] underline cursor-pointer text-center">Pricing</div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredVideos.length > 0 && filteredVideos.slice(0, 9).map((video) => (
              <Video key={video.URL} src={video.URL} />
            ))}
          </div>

        </div>


        <div className="flex justify-center mt-10 items-center gap-10">
          <div className="text-[#666666] text-sm">Trending Searches:</div>
          <button className="lightGreenButton">🔥 background</button>
          <button className="lightGreenButton">🔥 AI</button>
          <button className="lightGreenButton">🔥 abstract</button>
          <button className="lightGreenButton">🔥 3D particles</button>
        </div>

      </div>
    </>
  );
};

export default Collection;
