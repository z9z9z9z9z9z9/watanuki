/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const Player = ({ episodeId, currentEp }) => {
  const [category, setCategory] = useState("sub");

  const changeCategory = (newType) => {
    if (newType !== category) {
      setCategory(newType);
    }
  };

  return (
    <>
      <div className="w-full bg-black aspect-video relative mt-10 max-w-screen-xl overflow-hidden">
        <iframe
          src={`https://megaplay.buzz/stream/s-2/${episodeId
            .split("ep=")
            .pop()}/${category}`}
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
      </div>
      <div className="category flex flex-wrap justify-center gap-3 bg-black py-2">
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
        <div className="flex flex-col">
          <p className="text-gray-400">
            you are watching Episode {currentEp.episodeNumber}
          </p>
          {currentEp.isFiller && (
            <p className="text-red-400">your are watching filler Episode 👻</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
