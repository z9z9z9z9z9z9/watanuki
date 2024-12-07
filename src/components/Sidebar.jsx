import useSidebarStore from "../store/sidebarStore";
import { Link, useLocation } from "react-router-dom";
import Genres from "./Genres";

import { useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";

const Sidebar = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);

  const location = useLocation();
  const key = location.key;

  useEffect(() => {
    isSidebarOpen ? sidebarHandler() : null;
  }, [key]);

  const list = [
    { name: "Home", link: "/home" },
    { name: "Subbed Anime", link: "/subbed-anime" },
    { name: "Dubbed Anime", link: "/dubbed-anime" },
    { name: "Most Popular", link: "/most-popular" },
    { name: "Top Airing", link: "/top-airing" },
    { name: "Latest Completed", link: "/latest-completed" },
    { name: "A-Z List", link: "/az-list" },
    { name: "Movies", link: "/movie" },
    { name: "OVAs", link: "/ova" },
    { name: "ONAs", link: "/ona" },
    { name: "Specials", link: "/special" },
  ];

  return (
    <div
      className={`sidebar transition-all fixed overflow-scroll h-full z-[100] inset-0 w-64 md:w-80  bg-[rgba(255,255,255,.1);] ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <button
        className="w-full pt-2 pl-2 flex items-center gap-2 hover:text-primary text-base md:text-xl"
        onClick={sidebarHandler}
      >
        <FaAngleLeft />
        <span>close menu</span>
      </button>
      <ul>
        {list.map((item) => (
          <li
            key={item.link}
            onClick={sidebarHandler}
            className=" py-4 pl-2 hover:text-primary  text-base md:text-lg border-b border-[rgba(255,255,255,.05)] w-full"
          >
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
        <li className=" py-4 pl-2 text-base md:text-lg w-full">genres</li>
        <Genres
          event={sidebarHandler}
          className="w-1/2 my-2 pl-2 hover:opacity-[.7]"
        />
      </ul>
    </div>
  );
};

export default Sidebar;
