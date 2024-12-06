import React from "react";
import useSidebarStore from "../store/sidebarStore";
import { Link } from "react-router-dom";

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
      className={`sidebar fixed overflow-auto rounded-md scroll h-full z-[100] inset-0 sm:w-80 w-full bg-[#b0b1b430] ${
        isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <button
        className="w-full mx-auto mt-2 hover:bg-backGround text-xl"
        onClick={sidebarHandler}
      >
        close
      </button>
      <ul>
        {list.map((item) => (
          <li
            key={item.link}
            className="py-5 hover:text-primary  text-lg ml-5 border-b border-gray-500 w-full "
          >
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
