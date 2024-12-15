import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import AZ from "../layouts/AZ";

const Footer = () => {
  return (
    <div className="row mx-2  mt-5">
      <div className="logo w-full flex justify-center items-center">
        <Logo />
      </div>
      <div className="my-2 h-1 border-b border-b-neutral-700 "></div>
      <div className="az-list flex justify-center items-center">
        <h1 className="text-primary font-bold text-lg mb-2 mr-3">AZ-LIST </h1>
        <p className="hidden sm:block text-primary font-bold text-lg mb-2">
          Searching anime order by alphabet name A to Z.
        </p>
      </div>

      <AZ />
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
