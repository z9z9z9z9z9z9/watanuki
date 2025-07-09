/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
const Episodes = ({ episode, currentEp, layout }) => {
  const isCurrent = episode.id === currentEp.id;
  return (
    <>
      {layout === "row" ? (
        <li
          title={episode.title}
          className={`w-full px-1 py-3 transition-all text-black duration-200 ${
            isCurrent ? "bg-primary" : " bg-btnBg"
          } ${episode.isFiller && !isCurrent ? "bg-[#5b308c]" : null} ${
            !isCurrent ? "hover:bg-btnBgHover" : null
          }`}
        >
          <Link
            to={`/watch/${episode.id.replaceAll("::", "?")}`}
            className="block w-full"
          >
            <div className="flex gap-3 items-center">
              <button
                className={`text-sm ${
                  isCurrent ? "text-black" : "text-primary"
                }`}
              >
                {episode.episodeNumber}
              </button>
              <li
                className={`flex-1 ${
                  isCurrent ? "text-black" : "text-white"
                } text-sm truncate`}
              >
                {episode.title}
              </li>
              {episode.isFiller && <span title="Filler">👻</span>}
            </div>
          </Link>
        </li>
      ) : (
        <li
          title={episode.title}
          className={` w-full rounded-md p-1 transition-all hover:bg-btnBgHover duration-200  ${
            isCurrent ? "bg-primary" : "bg-btnBg"
          }
            ${episode.isFiller ? "bg-[#5b308c]" : null} 
          `}
        >
          <Link
            to={`/watch/${episode.id.replaceAll("::", "?")}`}
            className="block w-full"
          >
            <p
              className={` text-sm md:text-base text-center ${
                isCurrent ? "text-black" : "text-primary"
              }`}
            >
              {episode.episodeNumber}
            </p>
          </Link>
        </li>
      )}
    </>
  );
};

export default Episodes;
