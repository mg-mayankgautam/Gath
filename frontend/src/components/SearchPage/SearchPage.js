import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import axios from "axios";
import { Link } from "react-router-dom";
import Video from "../HomePage/Video";
import { useTheme } from "../../context/ThemeProvider";
import TrendingSearch from "../HomePage/TrendingSearch";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaTimes } from "react-icons/fa"; // Import the delete icon
import { useNavigate } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();

  const [filteredVideos, setFilteredVideos] = useState([]);
  // const [showFilters, setShowFilters] = useState(false);
  const [durationRange, setDurationRange] = useState([0, 30]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [resolutionFilter, setResolutionFilter] = useState("all");

  // Extract all unique themes from videos
  const allThemes = Array.from(
    new Set(filteredVideos.flatMap((video) => video.theme))
  ).filter(Boolean);
  // Extract all unique tags for tag filtering
  const allTags = Array.from(
    new Set(filteredVideos.flatMap((video) => video.tags))
  ).filter(Boolean);

  useEffect(() => {
    const term = searchParams.get("term");
    if (term) {
      console.log("Extracted keyword:", term);

      const keywordsArray = term
        .split(" ")
        .map((word) => word.trim())
        .filter((word) => word !== "");

      // Set the array of keywords
      setKeyword(keywordsArray);
      //   setKeyword(term);
      // Now, fetch videos based on this term
      const fetchFilteredVideos = async (searchTerm) => {
        try {
          const response = await axios.get(
            `${
              process.env.REACT_APP_BACKEND_URL
            }/videos/getsearchvideos?term=${encodeURIComponent(searchTerm)}`
          );
          console.log("Filtered videos:", response.data);
          setFilteredVideos(response.data);
        } catch (error) {
          console.error("Error fetching filtered videos:", error);
          setFilteredVideos([]);
        }
      };

      fetchFilteredVideos(term);
    } else {
      console.log("No search term in URL.");
      setFilteredVideos([]);
    }
  }, [searchParams]);

  // Apply filters to videos
  const applyFilters = () => {
    return filteredVideos.filter((video) => {
      // Duration filter
      const videoDuration = parseFloat(video.duration);
      if (
        videoDuration < durationRange[0] ||
        videoDuration > durationRange[1]
      ) {
        return false;
      }

      // Theme filter
      if (
        selectedThemes.length > 0 &&
        !selectedThemes.some((theme) => video.theme.includes(theme))
      ) {
        return false;
      }

      // Resolution filter
      if (resolutionFilter !== "all") {
        const minHeight =
          resolutionFilter === "4k"
            ? 2160
            : resolutionFilter === "1080p"
            ? 1080
            : 720;
        if (parseInt(video.videoHeight) < minHeight) {
          return false;
        }
      }

      return true;
    });
  };

  // Sort videos based on selected option
  const sortVideos = (videos) => {
    switch (sortBy) {
      case "views":
        return [...videos].sort((a, b) => b.views - a.views);
      case "duration":
        return [...videos].sort(
          (a, b) => parseFloat(b.duration) - parseFloat(a.duration)
        );
      case "newest":
        return [...videos].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return videos; // relevance - already sorted by backend
    }
  };

  const filteredAndSortedVideos = sortVideos(applyFilters());

  const toggleTheme = (theme) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  const predefinedThemes = [
    "food",
    "indian",
    "nature",
    "vintage",
    "rural",
    "festival",
  ];
  const predefinedShots = ["close-up", "Aerial", "pan-shot"];

  const [activeSidebar, setActiveSidebar] = useState(null); // null | 'themes' | 'shotTypes' | etc.
  const sidebarItems = [
    { id: "themes", label: "Video Themes", content: predefinedThemes },
    { id: "shotTypes", label: "Shot Types", content: predefinedShots },
    // Future items can be added here
  ];

  const handleThemeClick = (newTheme) => {
    const currentParams = new URLSearchParams(window.location.search);
    const currentTerm = currentParams.get("term") || "";

    // Split existing terms and add new theme (avoid duplicates)
    const terms = currentTerm.split(" ").filter((term) => term.trim() !== "");

    if (!terms.includes(newTheme)) {
      terms.push(newTheme);
    }

    // Reconstruct the search URL
    const newTerm = terms.join(" ");
    navigate(`/search?term=${encodeURIComponent(newTerm)}`);
  };

  return (
    <div className="bigscreen p-10">
      <div className="flex flex-col gap-2 mb-20 text-center items-center">
        <div className="text-4xl font-bold">Search Anything!</div>
        <div className="text-xl font-light mt-1 mb-8">
          Access the broadest range of assets in one place.
        </div>
        <SearchInput />
      </div>

      <div className="flex gap-2 my-2 items-center">
        <div className="flex w-full max-w-full modalOverflowX gap-2 my-2">
          {keyword.map((theme, index) => (
            <span
              key={index}
              className={`${
                darkMode ? "bg-[#284637]" : "bg-[#C9DBD2]"
              } py-1 px-2 rounded text-sm mt-2 whitespace-nowrap flex gap-1 items-center text-xs`}
            >
              {theme}
              <FaTimes
                className="cursor-pointer"
                // onClick={() => handleDeleteTheme(index)} // Handle delete on click
              />
            </span>
          ))}
        </div>
        {keyword?.length > 0 && <button className="whitespace-nowrap hover:underline text-sm">Clear All</button>}
      </div>

      <div className={activeSidebar ? "flex gap-4" : "flex gap-2"}>
        <div
          className={
            darkMode ? "FiltersDiv dark flex-grow" : "FiltersDiv flex-grow"
          }
        >
          <div
            className={`font-semibold cursor-pointer hover:text-[var(--primary)] ${
              activeSidebar == "filters" && "text-[var(--primary)]"
            } flex gap-2 items-center mb-4`}
            // onClick={() => setShowFilters(!showFilters)}
            onClick={() =>
              setActiveSidebar(activeSidebar == "filters" ? null : "filters")
            }
          >
            <BsFilterLeft /> Filters & Sort
          </div>

          {/* here showfilters was there previously */}

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
              <div
                key={contentItem}
                onClick={() => handleThemeClick(contentItem)}
                className="font-medium cursor-pointer text-[var(--grey)] text-sm hover:text-[var(--primary)]"
              >
                {contentItem}
              </div>
            ))}

          {activeSidebar == "filters" && (
            <div className="space-y-6">
              {/* Duration Slider */}
              <div>
                <div className="text-sm font-medium mb-2">
                  Duration: {durationRange[0]}s - {durationRange[1]}s
                </div>
                <Slider
                  range
                  min={0}
                  max={60}
                  value={durationRange}
                  onChange={setDurationRange}
                  trackStyle={{ backgroundColor: "var(--primary)" }}
                  handleStyle={{
                    borderColor: "var(--primary)",
                    backgroundColor: "white",
                    opacity: 1,
                  }}
                  railStyle={{
                    backgroundColor: darkMode ? "#4b5563" : "#e5e7eb",
                  }}
                />
              </div>

              {/* Theme Filter */}
              {allThemes.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">Themes</div>
                  <div className="space-y-2">
                    {allThemes.map((theme) => (
                      <div key={theme} className="flex items-center">
                        <button
                          onClick={() => toggleTheme(theme)}
                          className={`w-4 h-4 rounded mr-2 border ${
                            selectedThemes.includes(theme)
                              ? "bg-[var(--primary)] border-[var(--primary)]"
                              : "border-gray-400"
                          }`}
                        />
                        <span className="text-sm">{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resolution Filter */}
              <div>
                <div className="text-sm font-medium mb-2">Resolution</div>
                <div className="space-y-2">
                  {["all", "4k", "1080p", "720p"].map((res) => (
                    <div key={res} className="flex items-center">
                      <button
                        onClick={() => setResolutionFilter(res)}
                        className={`w-4 h-4 rounded-full mr-2 border ${
                          resolutionFilter === res
                            ? "bg-[var(--primary)] border-[var(--primary)]"
                            : "border-gray-400"
                        }`}
                      />
                      <span className="text-sm">
                        {res === "all" ? "All Resolutions" : res}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <div className="text-sm font-medium mb-2">Sort By</div>
                <div className="space-y-2">
                  {["relevance", "views", "duration", "newest"].map(
                    (option) => (
                      <div key={option} className="flex items-center">
                        <button
                          onClick={() => setSortBy(option)}
                          className={`w-4 h-4 rounded-full mr-2 border ${
                            sortBy === option
                              ? "bg-[var(--primary)] border-[var(--primary)]"
                              : "border-gray-400"
                          }`}
                        />
                        <span className="text-sm capitalize">{option}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full content-start">
          {filteredAndSortedVideos.length > 0 ? (
            filteredAndSortedVideos.map((video) => (
              <div key={video._id} className="aspect-[16/9]">
                <Video video={video} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg">No videos found matching your criteria</p>
              <button
                onClick={() => {
                  setDurationRange([0, 30]);
                  setSelectedThemes([]);
                  setSortBy("relevance");
                  setResolutionFilter("all");
                }}
                className="mt-4 text-[var(--primary)] underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <TrendingSearch />
    </div>
  );
};

export default SearchPage;
