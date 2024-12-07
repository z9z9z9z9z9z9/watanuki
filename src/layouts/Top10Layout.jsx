import React, { useState } from "react";
import useTopTenStore from "../store/toptenStore";
import MiniPoster from "../components/MiniPoster";

const Top10Layout = () => {
  const [selectedTab, setSelectedTab] = useState("today");
  const tabs = [{ name: "today" }, { name: "week" }, { name: "month" }];
  const topTen = useTopTenStore((state) => state.topTen);

  const handleTabChange = (name) => {
    selectedTab !== name ? setSelectedTab(name) : null;
  };

  return (
    <div className="mx-2">
      <div className="infor flex justify-between">
        <h1>top 10</h1>
        <div className="buttons flex bg-lightBg rounded-md">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabChange(tab.name)}
              className={`${
                selectedTab === tab.name
                  ? "bg-primary  text-black"
                  : "hover:text-primary"
              } px-4 py-1.5 `}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className="box bg-lightBg px-4 py-2">
        {topTen[selectedTab]?.map((item) => (
          <div key={item.id} className="flex items-center gap-10">
            <h1
              className={`rank text-2xl font-extrabold ${
                item.rank <= 3 ? " border-primary border-b-2" : ""
              }`}
            >
              0{item.rank}
            </h1>
            <MiniPoster item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top10Layout;
