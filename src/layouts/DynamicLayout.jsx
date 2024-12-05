/* eslint-disable react/prop-types */
import React from "react";
import SoundsInfo from "../components/SoundsInfo";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Heading from "../components/Heading";

const DynamicLayout = ({ dataType, data }) => {
  const link = dataType.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className=" col-span-12 md:col-span-6 mt-5 xl:col-span-3">
      <Heading className="mb-5">{dataType}</Heading>
      <div className="items h-auto w-full flex flex-col gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex border-b border-lightBg pb-3 items-center gap-4"
          >
            <Link className="" to={`/${item.id}`}>
              <div className="poster rounded-md flex-shrink-0 relative overflow-hidden w-16 pb-[90px]">
                <img
                  className="h-full absolute w-full object-cover object-center"
                  src={item.poster}
                  alt={item.title}
                />
              </div>
            </Link>
            <div className="text">
              <Link to={`/${item.id}`}>
                <h2 className="title hover:text-primary mb-2 font-extrabold">
                  {item.title}
                </h2>
              </Link>
              <div className="item">
                <SoundsInfo episodes={item.episodes} />
                <span className="block mx-1 h-1 w-1 bg-yellow-200 rounded-full"></span>
                <h2 className="text-[12px] text-[#ccc]">{item.type}</h2>
              </div>
            </div>
          </div>
        ))}
        <div className="more">
          <Link
            className="flex hover:text-primary items-center gap-2"
            to={`/${link}`}
          >
            <span>View More</span>
            <FaAngleRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicLayout;
