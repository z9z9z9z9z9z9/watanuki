import React from "react";
import Genres from "../components/Genres";

const GenresLayout = () => {
  return (
    <div>
      <h1 className="text-primary text-xl mb-2 ml-2">genres</h1>
      <div className="sm:bg-lightBg bg-none rounded-sm px-2 py-1">
        <Genres className="sm:w-1/3 px-2 rounded-sm py-1 mb-2 line-clamp-1 bg-lightBg sm:bg-transparent mx-1 sm:mx-0 text-center font-bold text-lg xl:text-base" />
      </div>
    </div>
  );
};

export default GenresLayout;
