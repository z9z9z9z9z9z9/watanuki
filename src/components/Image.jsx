/* eslint-disable react/prop-types */
import React from "react";
import SoundsInfo from "../components/SoundsInfo";
import { Link } from "react-router-dom";

const Image = ({ data }) => {
  return (
    <div>
      <Link to={`/${data.id}`}>
        <div className="film-poster md:hover:blur-[4px] rounded-sm w-full h-full pb-[140%] mb-2 relative overflow-hidden bg-white block">
          <div className="z-50 opacity-[.9] absolute bottom-4 left-2">
            <SoundsInfo episodes={data.episodes} />
          </div>
          <img
            className="absolute h-full w-full inset-0 object-cover object-center"
            src={data.poster}
            loading="lazy"
            alt={data.title}
          />
        </div>
      </Link>
      <Link>
        <div
          title={data.title}
          className="title line-clamp-1 text-sm md:text-base hover:text-primary"
        >
          <h1>{data.title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default Image;
