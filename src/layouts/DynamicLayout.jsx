/* eslint-disable react/prop-types */
import React from "react";
import SoundsInfo from "../components/SoundsInfo";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Heading from "../components/Heading";
import MiniPoster from "../components/MiniPoster";

const DynamicLayout = ({ dataType, data }) => {
  const link = dataType.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className=" col-span-12 md:col-span-6 mt-5 xl:col-span-3">
      <Heading className="mb-5">{dataType}</Heading>
      <div className="items h-auto w-full flex flex-col gap-3">
        {data.map((item) => (
          <MiniPoster key={item.id} item={item} />
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
