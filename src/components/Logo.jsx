import React from "react";
import loader from "../assets/loader.gif";

const Logo = () => {
  return (
    <div className="logo">
      <h1 className="gradient-text select-none text-base flex md:text-xl">
        WATANUKI綿貫
        <img
          src={loader}
          alt=""
          className="loader-animation absolute w-5 top-[10%] left-0"
        />
      </h1>
    </div>
  );
};

export default Logo;
