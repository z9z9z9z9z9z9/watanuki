/* eslint-disable react/prop-types */
import React from "react";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";

const SoundsInfo = ({ episodes }) => {
  return (
    <div className="flex gap-0.5 font-extrabold">
      <div className="item bg-yellow text-sm px-1 text-black rounded-sm rounded-tr-none rounded-br-none">
        <FaClosedCaptioning />
        <span className="text-sm font-bold">{episodes.sub}</span>
      </div>

      <div className="item bg-purple px-1 text-[12px] text-black">
        <FaMicrophone />
        <span className="text-sm font-bold">{episodes.dub}</span>
      </div>

      <div className="item px-1 rounded-sm rounded-tl-none rounded-bl-none text-black text-sm bg-pink">
        {episodes.eps}
      </div>
    </div>
  );
};

export default SoundsInfo;
