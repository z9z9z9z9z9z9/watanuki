import React from "react";

const Episodes = ({ episode }) => {
  return (
    <ul className="px-2 py-2 w-full hover:bg-lightBg" key={episode.id}>
      <a href={`/watch/${episode.episodeId}`}>
        <div className="flex gap-3">
          <li className="text-lg font-bold text-primary">{episode.number}</li>
          <li>{episode.title}</li>
        </div>
      </a>
    </ul>
  );
};

export default Episodes;
