import React from "react";
import assetgroup from "../../assets/home/assetgroup.png";

const CollectionSlider = () => {
  return (
    <div className="px-5 md:px-10 my-10">
      <div className="font-semibold text-2xl">Collections</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4">
        <div className="text-sm sm:text-base flex gap-2 sm:gap-4">
          <img
            src={assetgroup}
            className="max-h-[50px] h-full w-full max-w-[72px] object-cover rounded-sm"
          />

          <div className="flex flex-col flex-grow justify-between">
            <div className="font-semibold">Asset Group 1</div>

            <div className="text-xs sm:text-sm text-[#666666]">56 assets</div>
          </div>
        </div>

        <div className="text-sm sm:text-base flex gap-2 sm:gap-4">
          <img
            src={assetgroup}
            className="max-h-[50px] h-full w-full max-w-[72px] object-cover rounded-sm"
          />

          <div className="flex flex-col flex-grow justify-between">
            <div className="font-semibold">Asset Group 1</div>

            <div className="text-xs sm:text-sm text-[#666666]">56 assets</div>
          </div>
        </div>
        <div className="text-sm sm:text-base flex gap-2 sm:gap-4">
          <img
            src={assetgroup}
            className="max-h-[50px] h-full w-full max-w-[72px] object-cover rounded-sm"
          />

          <div className="flex flex-col flex-grow justify-between">
            <div className="font-semibold">Asset Group 1</div>

            <div className="text-xs sm:text-sm text-[#666666]">56 assets</div>
          </div>
        </div>
        <div className="text-sm sm:text-base flex gap-2 sm:gap-4">
          <img
            src={assetgroup}
            className="max-h-[50px] h-full w-full max-w-[72px] object-cover rounded-sm"
          />

          <div className="flex flex-col flex-grow justify-between">
            <div className="font-semibold">Asset Group 1</div>

            <div className="text-xs sm:text-sm text-[#666666]">56 assets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSlider;
