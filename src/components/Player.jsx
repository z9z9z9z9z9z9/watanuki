/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";

const Player = ({ episodeId, currentEp, changeEpisode }) => {
  const [category, setCategory] = useState("sub");

  const changeCategory = (newType) => {
    if (newType !== category) {
      setCategory(newType);
    }
  };

  return (
    <>
      <div className="w-full bg-black aspect-video relative  max-w-screen-xl overflow-hidden">
        <iframe
          src={`https://megaplay.buzz/stream/s-2/${episodeId
            .split("ep=")
            .pop()}/${category}`}
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
      </div>
      <div className="category flex flex-wrap flex-col sm:flex-row items-center justify-center  sm:justify-between px-2 md:px-20 gap-3 bg-black py-2">
        <div className="sound flex gap-3">
          {["sub", "dub"].map((type) => (
            <button
              key={type}
              onClick={() => changeCategory(type)}
              className={`${
                category === type
                  ? "bg-primary text-black"
                  : "bg-lightBg  text-white"
              } px-2 py-1 rounded text-sm font-semibold`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          <p className="text-gray-400">
            you are watching Episode {currentEp.episodeNumber}
          </p>
          {currentEp.isFiller && (
            <p className="text-red-400">your are watching filler Episode 👻</p>
          )}
        </div>
        <div className="btns bg-primary px-2 py-1 text-black rounded-sm flex gap-4">
          {currentEp.episodeNumber > 1 && (
            <button
              title="prev"
              className="prev"
              onClick={() => changeEpisode("prev")}
            >
              <TbPlayerTrackPrevFilled />
            </button>
          )}
          <button
            title="next"
            className="next"
            onClick={() => changeEpisode("next")}
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
