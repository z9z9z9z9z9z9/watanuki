import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Heading from "./Heading";

const Footer = () => {
  const azList = [
    { title: "All", link: "/animes/az-list" },
    { title: "#", link: "/animes/az-list/other" },
    { title: "0-9", link: "/animes/az-list/0-9" },
    { title: "A", link: "/animes/az-list/A" },
    { title: "B", link: "/animes/az-list/B" },
    { title: "C", link: "/animes/az-list/C" },
    { title: "D", link: "/animes/az-list/D" },
    { title: "E", link: "/animes/az-list/E" },
    { title: "F", link: "/animes/az-list/F" },
    { title: "G", link: "/animes/az-list/G" },
    { title: "H", link: "/animes/az-list/H" },
    { title: "I", link: "/animes/az-list/I" },
    { title: "J", link: "/animes/az-list/J" },
    { title: "K", link: "/animes/az-list/K" },
    { title: "L", link: "/animes/az-list/L" },
    { title: "M", link: "/animes/az-list/M" },
    { title: "N", link: "/animes/az-list/N" },
    { title: "O", link: "/animes/az-list/O" },
    { title: "P", link: "/animes/az-list/P" },
    { title: "Q", link: "/animes/az-list/Q" },
    { title: "R", link: "/animes/az-list/R" },
    { title: "S", link: "/animes/az-list/S" },
    { title: "T", link: "/animes/az-list/T" },
    { title: "U", link: "/animes/az-list/U" },
    { title: "V", link: "/animes/az-list/V" },
    { title: "W", link: "/animes/az-list/W" },
    { title: "X", link: "/animes/az-list/X" },
    { title: "Y", link: "/animes/az-list/Y" },
    { title: "Z", link: "/animes/az-list/Z" },
  ];

  return (
    <div className="row mx-2">
      <Link className="flex justify-center" to="/home">
        <Logo />
      </Link>
      <div className="my-2 h-1 border-b border-b-neutral-700 "></div>
      <div className="az-list flex justify-center items-center">
        <h1 className="text-primary font-bold text-lg mb-2 mr-3">AZ-LIST </h1>
        <p className="hidden sm:block text-primary font-bold text-lg mb-2">
          Searching anime order by alphabet name A to Z.
        </p>
      </div>
      <div className="list w-full flex gap-2 flex-wrap justify-center items-center">
        {azList.map((item) => (
          <Link to={item.link} key={item.title}>
            <h1
              className="px-2 py-0.5 bg-lightBg hover:bg-primary hover:text-black rounded-md font-bold mb-1"
              key={item.title}
            >
              {item.title}
            </h1>
          </Link>
        ))}
      </div>
      <div className="desclaimer mt-5 mb-2 flex flex-col justify-center items-center">
        <p className="text-sm text-center text-gray-500">
          Watanuki does not store any files on our server, <br /> we only linked
          to the media which is hosted on 3rd party services.{" "}
        </p>
        <p className="mt-4 text-gray-500">© watanuki All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
