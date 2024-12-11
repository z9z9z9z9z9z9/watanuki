/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SoundsInfo from "../components/SoundsInfo";
import { FaAngleRight } from "react-icons/fa";

const InfoPage = ({ data }) => {
  const [showFull, setShowFull] = useState(false);
  console.log(data);

  const colors = [
    "#d0e6a5",
    "#ffbade",
    "#fc887b",
    "#ccabda",
    "#abccd8",
    "#d8b2ab",
    "#86e3ce",
  ];
  return (
    <div className="infoPage">
      <div className="banner min-h-[700px] relative w-full bg-[#262525] pt-16 md:pt-28">
        <div className="backdrop-img bg-backGround w-full h-full absolute top-0 left-0 overflow-hidden opacity-[.1]">
          <img
            src={data.poster}
            alt={data.title}
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="opacity-overlay"></div>
        <div className="content max-w-[1200px] mx-auto flex flex-col items-start md:flex-row gap-10 relative px-4">
          <div className="left w-full flex justify-center">
            <div className="posterImg  w-full sm:w-1/2 md:w-60 xl:w-80">
              <img
                src={data.poster}
                alt={data.title}
                className="rounded-md h-full w-full"
              />
            </div>
          </div>
          <div className="right flex flex-col gap-2">
            <h1 className="title text-4xl font-extrabold">{data.title}</h1>
            <div className="alternative text-gray-400 text-xl font-bold">
              {data.alternativeTitle}
            </div>
            <div className="sounds flex items-center gap-3 my-2">
              <SoundsInfo episodes={data.episodes} />
              <span className="h-1 w-1 rounded-full bg-primary "></span>
              <span className="type text-[#ccc] text-sm font-bold">
                {data.type}
              </span>
              <span className="h-1 w-1 rounded-full bg-primary"></span>
              <span className="duration text-[#ccc] text-sm font-bold">
                {data.duration}
              </span>
            </div>
            <div className="genres flex gap-2 flex-wrap">
              {data.genres.map((genre, index) => (
                <p
                  style={{ background: colors[index % colors.length] }}
                  key={genre}
                  className="px-4 text-black py-1 rounded-2xl "
                >
                  {genre}
                </p>
              ))}
            </div>
            <div className="watch-btn my-4">
              <button className=" flex justify-center items-center gap-2 py-2 rounded-3xl text-lg text-black bg-primary w-1/2 ">
                <span>Watch Now</span>
                <FaAngleRight />
              </button>
            </div>
            <div className="scores flex text-sm font-bold">
              <h4 className="rating bg-white text-black px-1 rounded-l-sm">
                {data.rating}
              </h4>
              <h4 className="score bg-yellow rounded-r-sm text-black px-1">
                {data.MAL_score}
              </h4>
            </div>
            <div className="infor flex flex-col sm:flex-row gap-5">
              <div className="flex gap-1  status">
                <p className="font-extrabold">status:</p>
                {data.status}
              </div>
              <div className="flex gap-1  aired">
                <p className="font-extrabold">Aired:</p>
                {data.aired.from} {data.aired.to && "TO " + data.aired.to}
              </div>
            </div>
            <div className="overview">
              <p className={`${showFull ? "line-clamp-none" : "line-clamp-3"}`}>
                {data.synopsis}
              </p>
              <span
                onClick={() => setShowFull(!showFull)}
                className="text-sm cursor-pointer font-extrabold"
              >
                {showFull ? " - LESS" : " - MORE"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
