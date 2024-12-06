import React from "react";
import useSidebarStore from "../store/sidebarStore";
import { Link } from "react-router-dom";
import Genres from "./Genres";

const Sidebar = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);

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
      className={`sidebar transition-all fixed overflow-scroll rounded-md h-full z-[100] inset-0 w-64 md:w-80  bg-[rgba(255,255,255,.1);] ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <button
        className="w-full mx-auto hover:bg-backGround text-xl"
        onClick={sidebarHandler}
      >
        close
      </button>
      <ul>
        {list.map((item) => (
          <li
            key={item.link}
            className=" py-4 pl-2 hover:text-primary  text-base md:text-lg border-b border-[rgba(255,255,255,.05)] w-full"
          >
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
        <li className=" py-4 pl-2 text-base md:text-lg w-full">genres</li>
        <Genres />
      </ul>
    </div>
  );
};

export default Sidebar;
