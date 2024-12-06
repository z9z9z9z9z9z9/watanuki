/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import Image from "../components/Image";
import { FaAngleRight } from "react-icons/fa";

const MainLayout = ({ dataType, data }) => {
  const link = dataType.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="my-10">
      <div className="header flex justify-between">
        <Heading>{dataType}</Heading>
        <Link to={`/${link}`}>
          <h6 className="text-sm hover:text-primary flex items-center gap-1 text-neutral-400">
            <span>View more</span>
            <FaAngleRight />
          </h6>
        </Link>
      </div>
      <div className="wrapper flex justify-around flex-wrap h-full w-full">
        {data.map((item) => (
          <div key={item.id} className="flw-item">
            <Image data={item} key={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainLayout;