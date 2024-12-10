import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import loader from "../assets/loader.gif";

const Loader = ({ className }) => {
  return (
    <div
      className={`flex justify-center select-none items-center ${className}`}
    >
      <img src={loader} alt="loader" className="w-24 h-auto" />
    </div>
  );
};

export default Loader;
