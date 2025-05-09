import React, { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import Video from "./Video";
import axios from "axios";
import { Link } from "react-router-dom";
import TrendingSearch from "./TrendingSearch";
import { useTheme } from "../../context/ThemeProvider";

const Collection = ({ searchQuery, setSearchQuery }) => {
  const { darkMode } = useTheme();

  const [filteredVideos, setFilteredVideos] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // New state for total pages
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showShotType, setShowShotType] = useState(false);
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;

  const predefinedThemes = [
    "food",
    "indian",
    "nature",
    "vintage",
    "rural",
    "festival",
  ];
  const predefinedShots = ["close-up", "Aerial", "pan-shot"];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/videos/get?page=${currentPage}&limit=${videosPerPage}`
        );
        console.log(response.data);
        setFilteredVideos(response.data.videos);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("There was an error getting the videos!", error);
      }
    };

    getData();
  }, [currentPage, videosPerPage]);

  const handleFilterChange = (category) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };
  const [activeSidebar, setActiveSidebar] = useState(null); // null | 'themes' | 'shotTypes' | etc.
  const sidebarItems = [
    { id: "themes", label: "Video Themes", content: predefinedThemes },
    { id: "shotTypes", label: "Shot Types", content: predefinedShots },
    // Future items can be added here
  ];

  return (
    <>
      <div className="Home">
        <div className={activeSidebar == null ? "flex gap-2" : "flex gap-2"}>
          <div
            className={
              darkMode ? "FiltersDiv dark flex-grow" : "FiltersDiv flex-grow"
            }
          >
            {/* Main sidebar items */}
            {sidebarItems.map((item) => (
              <div
                key={item.id}
                className={`font-medium cursor-pointer hover:text-[var(--primary)] ${
                  activeSidebar === item.id && "text-[var(--primary)]"
                }`}
                onClick={() =>
                  setActiveSidebar(activeSidebar === item.id ? null : item.id)
                }
              >
                {item.label}
              </div>
            ))}

            {/* Static footer items */}
            <div className="mx-auto mt-auto flex flex-col">
              <button className="greenButton mb-4">Start free now</button>
              <Link to="/pricing" className="mx-auto">
                <button className="text-[var(--primary)] underline cursor-pointer text-center">
                  Pricing
                </button>
              </Link>
            </div>
          </div>

          {/* Sub-sidebars */}
          <div
            className={`FiltersDiv ${darkMode ? "dark" : ""} ${
              activeSidebar ? "flex-grow" : "hide"
            }`}
          >
            {sidebarItems
              .find((item) => item.id === activeSidebar)
              ?.content.map((contentItem) => (
                <Link
                  key={contentItem}
                  to={`/search?term=${encodeURIComponent(contentItem)}`}
                  className="font-medium cursor-pointer text-[var(--grey)] text-sm hover:text-[var(--primary)]"
                >
                  {/* navigate(`/search?term=${encodeURIComponent(suggestion)}`); */}

                  {contentItem}
                </Link>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full content-start">
            {filteredVideos?.length > 0 &&
              filteredVideos?.map((video) => (
                <div key={video._id} className="aspect-[16/9]">
                  {" "}
                  {/* Adjust aspect ratio as needed */}
                  <Video video={video} />
                </div>
              ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <div
            className={`text-2xl font-semibold cursor-pointer ${
              currentPage === 1 && "opacity-30 pointer-events-none"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            ‹
          </div>

          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm cursor-pointer 
                ${
                  currentPage === i + 1
                    ? "bg-[var(--primary)] text-black"
                    : "bg-transparent"
                }`}
            >
              {i + 1}
            </div>
          ))}

          <div
            className={`text-2xl font-semibold cursor-pointer ${
              currentPage === totalPages && "opacity-30 pointer-events-none"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            ›
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;

// import React, { useEffect, useState } from "react";
// import { BsFilterLeft } from "react-icons/bs";
// import Video from "./Video";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import TrendingSearch from "./TrendingSearch";
// import { useTheme } from "../../context/ThemeProvider";
// import { dark } from "@mui/material/styles/createPalette";

// const Collection = ({ searchQuery, setSearchQuery }) => {

//   const { darkMode } = useTheme();

//   const [filteredVideos, setFilteredVideos] = useState([]);

//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortOrder, setSortOrder] = useState("Ascending");

//   useEffect(() => {

//     const getData = async () => {
//       try {
//         const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/videos/get`)

//         console.log(data.data);
//         setFilteredVideos(data.data);
//         // setAllProducts(data.data);
//       }
//       catch (error) { console.log('There was an error getting the videos!', error); }
//     }

//     getData();

//   }, [])

//   const handleFilterChange = (category) => {
//     setSelectedFilters((prevFilters) =>
//       prevFilters.includes(category)
//         ? prevFilters.filter((filter) => filter !== category)
//         : [...prevFilters, category]
//     );
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const videosPerPage = 9;

//   const totalPages = Math.ceil(filteredVideos?.length / videosPerPage);

//   const paginatedVideos = filteredVideos
//     ? filteredVideos.slice(
//       (currentPage - 1) * videosPerPage,
//       currentPage * videosPerPage
//     )
//     : [];

//   return (
//     <>

//       <div className="Home">

//         {/* <div className="flex gap-4 mt-0"> */}

//         <div className={showFilters ? "flex gap-4" : "flex gap-2"}>
//           <div className={darkMode ? "FiltersDiv dark flex-grow" : "FiltersDiv flex-grow"}>

//             <div className=
//               {`font-medium cursor-pointer hover:text-[var(--primary)] ${showFilters && 'text-[var(--primary)]'}`} onClick={() => setShowFilters(!showFilters)}>
//               Video Themes
//             </div>
//             <div className="font-medium cursor-pointer hover:text-[var(--primary)]">Shot Types</div>
//             <div className="font-medium cursor-pointer hover:text-[var(--primary)]">People</div>
//             <div className="font-medium cursor-pointer hover:text-[var(--primary)]">Collections</div>
//             <div className="font-medium cursor-pointer hover:text-[var(--primary)]">Filmmakers</div>

//             <div className="mx-auto mt-auto flex flex-col">
//               <button className="greenButton mb-4">Start free now</button>
//               <Link to='/pricing' className="mx-auto"><button className="text-[var(--primary)] underline cursor-pointer text-center">Pricing</button></Link>
//             </div>

//           </div>

//           <div className={`FiltersDiv  ${darkMode ? "dark" : ""} ${showFilters ? "flex-grow" : "hide"}`}>

//             <Link to='/category/one'
//               className="font-medium cursor-pointer text-[var(--grey)] text-sm hover:text-[var(--primary)]"
//             >
//               Category 1
//             </Link>

//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//             {/* {filteredVideos.length > 0 && filteredVideos.slice(0, 9).map((video) => ( */}
//             {paginatedVideos?.length > 0 && paginatedVideos?.map((video) => (
//               <div key={video._id} className="aspect-[16/9]"> {/* Adjust aspect ratio as needed */}
//                 <Video video={video} />
//               </div>
//             ))}
//           </div>

//         </div>

//         {/* Pagination */}
//         <div className="mt-10 flex justify-center items-center gap-4">
//           <div
//             className={`text-2xl font-semibold cursor-pointer ${currentPage === 1 && "opacity-30 pointer-events-none"}`}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             ‹
//           </div>

//           {Array.from({ length: totalPages }, (_, i) => (
//             <div
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`w-10 h-10 flex items-center justify-center rounded-full text-sm cursor-pointer
//         ${currentPage === i + 1
//                   ? "bg-[var(--primary)] text-black"
//                   : "bg-transparent"}`}
//             >
//               {i + 1}
//             </div>
//           ))}

//           <div
//             className={`text-2xl font-semibold cursor-pointer ${currentPage === totalPages && "opacity-30 pointer-events-none"}`}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           >
//             ›
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default Collection;

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
