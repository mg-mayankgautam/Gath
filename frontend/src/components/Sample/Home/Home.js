import React, { useState } from "react";
import "./Home.css";



import Video from "../Video/Video";
import { BsFilterLeft } from "react-icons/bs";

import Header from "../Header/Header";
// Import all videos from the assets folder
import vid1 from '../../../assets/ALTA_KATORI_BOWL_RED_HENNA_DURGA_POOJA_PUJO.mp4';
import vid2 from '../../../assets/CHANA_MASALA_RICE_INDIAN_FOOD_SPICES_DHANIA_BASMATI_CHICKPEAS.mp4';
import vid3 from '../../../assets/BOTTLE_GOURD_FARM_AGRICULTURE_CROP_HARVEST_FARMING_FARMER_VEGETABLE_GREEN_NATURE_FIELDS_VINE_MOTHER_EARTH_LEAVES.mp4';
import vid4 from '../../../assets/CUCUMBER_BEING_PUT_INTO_A_BOX_IN_A_STACK_VEGETABLES_SORTING_FACILITY_AGRICULTURE_HARVEST_FARMERS_MARKET_FARMING.mp4';
import vid5 from '../../../assets/sample.mp4';
import vid6 from '../../../assets/FARMERS_WALKING_THROUGH_FARM_FIELD_NATURE_INDIAN_MAN_HARVESTING_PLUCKING_BOTTLE_GOURD_HARVEST_MAN_IN_FIELD_GREENERY_NATURE_AGRIC.mp4';
import vid7 from '../../../assets/DAL_TADKA_RICE_INDIAN_FOOD_SPICES_DHANIA_BASMATI_LENTILS_CORIANDER_RED_CHILLY_FOOD_PLATTER_INDIAN_MASALA.mp4';
import vid8 from '../../../assets/FARMER_HARVESTING_PLUCKING_CUCUMBER_HARVEST_MAN_IN_FIELD_GREENERY_NATURE_AGRICULTURE_FARM_LEAVES_TREES_VEGETABLES_FARMING_INDIAN_FRUITS.mp4';
import vid9 from '../../../assets/FARMER_MAN_STANDING_LOOKING_IN_FIELD_GREENERY_NATURE_AGRICULTURE_FARM_LEAVES_TREES_VEGETABLES_FARMING_INDIAN_FRUITS.mp4';
import vid10 from '../../../assets/FARMER_MAN_WALKING_IN_FIELD_GREENERY_NATURE_AGRICULTURE_FARM_LEAVES_TREES_VEGETABLES_FARMING_INDIAN_FRUITS.mp4';
import vid11 from '../../../assets/INDIAN_MEN_BOYS_MALE_SMILING_SUNSET_RIVER_BRIDGE_INDIA_INDIAN_HOWRAH_KOLKATA_SUNSET_SLOW_MOTION_RIVER_BANK_RIVER_SIDE.mp4';
import vid12 from '../../../assets/INDIAN_WOMAN_MAN_TAKING_PHOTOS_MALE_FEMALE_FESTIVE_DECORATED_INDIAN_STREET_PARK_STREET_KOLKATA_TAXI_CARS_LIGHTS_CHRISTMAS_DECORATIONS_INDIAN_CROWD_LED_FAIRY_LIGHTS.mp4';
import vid13 from '../../../assets/INDIAN_WOMAN_ON_FESTIVE_DECORATED_INDIAN_STREET_PARK_STREET_KOLKATA_TAXI_CARS_LIGHTS_CHRISTMAS_DECORATIONS_INDIAN_CROWD_LED_FAIRY_LIGHTS.mp4';
import vid14 from '../../../assets/PILE_OF_CUCUMBER_VEGETABLES_STACKED_VEGETABLES_SORTING_FACILITY_AGRICULTURE_HARVEST_FARMERS_MARKET_FARMING_NATURE_HEALTHY.mp4';
import vid15 from '../../../assets/SUNSET_RIVER_BRIDGE_INDIA_INDIAN_HOWRAH_KOLKATA_SUNSET_SLOW_MOTION_RIVER_BANK_RIVER_SIDE.mp4';

const videoData = [
  {
    src: vid1,
    categories: ["Rituals", "Less than 15s"],
    keywords: ["alta", "katori", "bowl", "red", "henna", "durga", "pooja", "pujo"]
  },
  {
    src: vid2,
    categories: ["Food", , "Less than 15s"],
    keywords: ["chana", "masala", "rice", "indian", "spices", "dhania", "basmati", "chickpeas"]
  },
  {
    src: vid3,
    categories: ["Agriculture", "Nature",
      "More than 15s"],
    keywords: ["bottle gourd", "farm", "crop", "harvest", "farming", "vegetable", "green", "fields", "vine", "mother earth", "leaves"]
  },
  {
    src: vid4,
    categories: ["Agriculture",
      "More than 15s"],
    keywords: ["cucumber", "box", "stack", "sorting facility", "harvest", "farmers market"]
  },
  {
    src: vid5,
    categories: ["Agriculture", "Nature",
      "More than 15s"],
    keywords: ["farmer", "plucking", "bottle gourd", "harvest", "man", "field", "greenery", "farm", "trees", "vegetables", "farming", "indian fruits", "mother earth"]
  },
  {
    src: vid6,
    categories: ["Agriculture", "Nature",
      "More than 15s"],
    keywords: ["farmers", "walking", "farm field", "indian man", "bottle gourd", "greenery", "harvesting"]
  },
  {
    src: vid7,
    categories: ["Food",
      "More than 15s"],
    keywords: ["dal tadka", "rice", "indian food", "spices", "lentils", "dhania", "coriander", "red chilly", "masala"]
  },
  {
    src: vid8,
    categories: ["Agriculture", "Nature",
      "More than 15s"],
    keywords: ["farmer", "plucking cucumber", "harvest", "field", "greenery", "farm", "trees", "farming", "indian fruits"]
  },
  {
    src: vid9,
    categories: ["Agriculture", "Nature", "Less than 15s"],
    keywords: ["farmer", "standing", "greenery", "field", "trees", "leaves"]
  },
  {
    src: vid10,
    categories: ["Agriculture", "Nature", "Less than 15s"],
    keywords: ["farmer", "walking", "field", "farm", "trees", "vegetables"]
  },
  {
    src: vid11,
    categories: ["Nature",
      "More than 15s"],
    keywords: ["indian men", "boys", "smiling", "sunset", "river", "bridge", "india", "howrah", "kolkata", "slow motion", "river bank"]
  },
  {
    src: vid12,
    categories: ["Festival", "Less than 15s"],
    keywords: ["indian woman", "man", "festive", "photos", "kolkata", "street park", "taxi cars", "lights", "decorated"]
  },
  {
    src: vid13,
    categories: ["Festival", "Less than 15s"],
    keywords: ["indian woman", "decorated street", "fairy lights", "crowd", "kolkata", "christmas"]
  },
  {
    src: vid14,
    categories: ["Agriculture", "Nature", "Less than 15s"],
    keywords: ["pile of cucumber", "stacked vegetables", "sorting", "harvest", "healthy"]
  },
  {
    src: vid15,
    categories: ["Nature", "Less than 15s"],
    keywords: ["sunset", "river", "bridge", "howrah", "kolkata", "slow motion", "water"]
  }
];






const Home = ({ searchQuery, setSearchQuery }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortOrder, setSortOrder] = useState("Ascending");


  const handleFilterChange = (category) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };

  // const filteredVideos = videoData
  //   .filter((video) =>
  //     (selectedFilters.length === 0 ||
  //       video.categories.some((category) => selectedFilters.includes(category))) &&
  //     (video.categories.some((category) =>
  //       category.toLowerCase().includes(searchQuery.toLowerCase())
  //     ) || video.keywords.some((keyword) =>
  //       keyword.toLowerCase().includes(searchQuery.toLowerCase())
  //     ))
  //   )
  //   .sort((a, b) => {
  //     if (sortOrder === "Ascending") {
  //       return a.src.localeCompare(b.src);
  //     } else {
  //       return b.src.localeCompare(a.src);
  //     }
  //   });

  const filteredVideos = videoData
  .filter((video) =>
    (selectedFilters.length === 0 ||
      selectedFilters.every((filter) => video.categories.includes(filter))) &&
    (video.categories.some((category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    ) || video.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  )
  .sort((a, b) => {
    if (sortOrder === "Ascending") {
      return a.src.localeCompare(b.src);
    } else {
      return b.src.localeCompare(a.src);
    }
  });


  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="Home">
        <div className="homeHeader">
          <div className="flex items-center gap-2 font-semibold cursor-pointer"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <BsFilterLeft size={24} />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </div>
          <div className="flex items-center gap-1 text-[var(--grey)] font-semibold">
            Sort by
            <select className="text-black cursor-pointer"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Ascending" className=" cursor-pointer">Ascending</option>
              <option value="Descending" className=" cursor-pointer">Descending</option>
            </select>
          </div>
        </div>

        <div className={showFilters ? "flex gap-4 md:gap-10 mt-6" : "flex mt-6"}>
          <div className={showFilters ? "FiltersDiv" : "FiltersDiv hide"}>
            <div className="font-semibold">Categories</div>
            <div className="flex flex-col gap-4">
              {[
                "Nature",
                "Agriculture",
                "Festival",
                "Food"
              ].map((category) => (
                <label className="flex items-center cursor-pointer"
                  key={category}
                  onChange={() => handleFilterChange(category)}
                >
                  <input
                    type="checkbox"
                    className="transform scale-150 mr-4 h-4"
                    checked={selectedFilters.includes(category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="font-semibold">Length</div>
            <div className="flex flex-col gap-4">
              {[
                "Less than 15s",
                "More than 15s",

              ].map((category) => (
                <label className="flex items-center cursor-pointer"
                  key={category}
                  onChange={() => handleFilterChange(category)}
                >
                  <input
                    type="checkbox"
                    className="transform scale-150 mr-4 h-4"
                    checked={selectedFilters.includes(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredVideos.map((video) => (
              <Video key={video.src} src={video.src} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
