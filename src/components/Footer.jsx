import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Heading from "./Heading";

const Footer = () => {
  const azList = [
    { title: "All", link: "/az-list" },
    { title: "#", link: "/az-list/other" },
    { title: "0-9", link: "/az-list/0-9" },
    { title: "A", link: "/az-list/A" },
    { title: "B", link: "/az-list/B" },
    { title: "C", link: "/az-list/C" },
    { title: "D", link: "/az-list/D" },
    { title: "E", link: "/az-list/E" },
    { title: "F", link: "/az-list/F" },
    { title: "J", link: "/az-list/J" },
    { title: "H", link: "/az-list/H" },
    { title: "I", link: "/az-list/I" },
    { title: "K", link: "/az-list/K" },
    { title: "L", link: "/az-list/L" },
    { title: "M", link: "/az-list/M" },
    { title: "N", link: "/az-list/N" },
    { title: "O", link: "/az-list/O" },
    { title: "P", link: "/az-list/P" },
    { title: "Q", link: "/az-list/Q" },
    { title: "W", link: "/az-list/W" },
    { title: "X", link: "/az-list/X" },
    { title: "Y", link: "/az-list/Y" },
    { title: "Z", link: "/az-list/Z" },
  ];
  return (
    <div className="row mx-2">
      <Link to="/">
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
