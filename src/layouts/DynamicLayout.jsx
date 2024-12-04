import React from "react";
import SoundsInfo from "../components/SoundsInfo";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const DynamicLayout = ({ dataType, data }) => {
  const link = dataType.toLowerCase().replace(/\s+/g, "-");
  console.log(link);

  return (
    <div className=" col-span-12 md:col-span-6 xl:col-span-3">
      <h1 className="text-xl font-extrabold mb-5 ml-5 tracking-widest  text-secondary my-2">
        {dataType}
      </h1>
      <div className="items h-auto w-full flex flex-col gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex border-b border-gray pb-3 items-center gap-4"
          >
            <div className="poster rounded-md flex-shrink-0 relative overflow-hidden w-16 pb-[80px]">
              <img
                className="h-full absolute w-full object-cover object-center"
                src={item.poster}
                alt={item.title}
              />
            </div>
            <div className="text">
              <h2 className="title mb-2 font-extrabold">{item.title}</h2>
              <SoundsInfo episodes={item.episodes} />
            </div>
          </div>
        ))}
        <div className="more">
          <Link className="flex items-center gap-2" to={`/${link}`}>
            <span>View More</span>
            <FaAngleRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicLayout;
