import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="#00ADB5"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
