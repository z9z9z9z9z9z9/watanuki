/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import SoundsInfo from "../components/SoundsInfo";

const InfoPage = ({ data }) => {
  return (
    <div className="anime-detail bg-backGround relative min-h-screen">
      <div className="wrapper pt-12 px-5 max-w-7xl mx-auto">
        {/* Cover Section */}
        <div
          className="cover absolute bg-center bg-cover w-full h-full rounded-lg"
          style={{ backgroundImage: `url(${data.poster})` }}
        ></div>

        {/* Main Content Section */}
        <div className="content relative flex flex-col xl:flex-row gap-8 mt-10">
          <div className="flex gap-2 flex-col md:flex-row">
            {/* Left Section: Poster */}
            <div className="poster w-[180px]">
              <div className="overflow-hidden pb-[140%] relative rounded-lg">
                <img
                  src={data.poster}
                  alt={data.title}
                  className="object-cover absolute object-center w-full"
                />
              </div>
            </div>

            {/* Central Section: Details */}
            <div className="details flex-1">
              {/* Breadcrumb Path */}
              <div className="breadcrumb text-gray-500 flex items-center gap-2 mb-2">
                <Link to="/home" className="hover:text-red-400">
                  Home
                </Link>
                <span>•</span>
                <Link to={`/${data.type}`} className="hover:text-red-400">
                  {data.type}
                </Link>
                <span>•</span>
                <span className="font-bold">{data.title}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

              {/* Rating Info */}
              <div className="rating flex items-center gap-4 text-gray-700 mb-4">
                <span className="bg-red-500 text-white py-1 px-3 rounded-lg">
                  {data.rating}
                </span>
                <SoundsInfo episodes={data.episodes} />
              </div>

              {/* Watch Button */}
              <Link to={`/watch/${data.id}`}>
                <button className="btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-red-500">
                  Watch Now
                </button>
              </Link>

              {/* Synopsis */}
              <div className="synopsis mt-4 text-gray-800">
                <p>{data.synopsis}</p>
              </div>
            </div>
          </div>

          {/* Right Section: Additional Info */}
          <div className="info w-full md:w-1/4 space-y-4">
            {data.japanese && (
              <p>
                <strong>Japanese:</strong> {data.japanese}
              </p>
            )}
            {data.synonyms && (
              <p>
                <strong>Synonyms:</strong> {data.synonyms}
              </p>
            )}
            {data.aired && (
              <p>
                <strong>Aired:</strong> {data.aired.from} to{" "}
                {data.aired.to || "?"}
              </p>
            )}
            {data.premiered && (
              <p>
                <strong>Premiered:</strong> {data.premiered}
              </p>
            )}
            {data.duration && (
              <p>
                <strong>Duration:</strong> {data.duration}
              </p>
            )}
            {data.status && (
              <p>
                <strong>Status:</strong> {data.status}
              </p>
            )}
            {data.MAL_score && (
              <p>
                <strong>MAL Score:</strong> {data.MAL_score}
              </p>
            )}
            {data.genres && (
              <div>
                <strong>Genres:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {data.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-200 rounded-lg text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.studios && (
              <p>
                <strong>Studio:</strong> {data.studios}
              </p>
            )}
            {data.producers && (
              <div>
                <strong>Producers:</strong>
                <ul className="list-disc ml-5">
                  {data.producers.map((producer) => (
                    <li key={producer}>{producer}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
