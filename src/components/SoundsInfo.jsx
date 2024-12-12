/* eslint-disable react/prop-types */
import React from "react";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";

const SoundsInfo = ({ episodes }) => {
  return (
    <div className=" rounded-child flex flex-wrap  font-extrabold">
      {episodes.rating && (
        <p className="item bg-white text-sm px-1 text-black">
          <span className="text-sm font-bold">{episodes.rating}</span>
        </p>
      )}
      <p className="item bg-yellow text-sm px-1 text-black">
        <FaClosedCaptioning />
        <span className="text-sm font-bold">{episodes.sub}</span>
      </p>

      <p className="item bg-purple px-1 text-[12px] text-black">
        <FaMicrophone />
        <span className="text-sm font-bold">{episodes.dub}</span>
      </p>

      <p className="item px-1 text-black text-sm bg-pink">{episodes.eps}</p>
      {episodes.MAL_score && (
        <p className="item px-1 text-black text-sm bg-yellow">
          {episodes.MAL_score !== "?" ? episodes.MAL_score : "N/A"}
        </p>
      )}
    </div>
  );
};

export default SoundsInfo;
