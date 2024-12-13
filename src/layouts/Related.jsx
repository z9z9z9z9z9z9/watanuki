import React, { useState } from "react";
import { useApi } from "../services/useApi";
import PageNotFound from "../pages/PageNotFound";
import Loader from "../components/Loader";
import DynamicLayout from "./DynamicLayout";
import MiniPoster from "../components/MiniPoster";
import Heading from "../components/Heading";

const Related = ({ id }) => {
  const [showAll, setShowAll] = useState(false);
  const initialItems = 10;
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useApi(`/related/${id}`);

  const data = response?.data;

  if (isError) {
    return <PageNotFound />;
  }
  if (data?.length < 1) return;

  const displayedData = showAll ? data : data?.slice(0, initialItems);

  return (
    <>
      {data && !isLoading ? (
        <div className="mt-11 mb-5">
          <Heading>Related</Heading>
          <div className="related bg-lightBg px-2 py-2 mt-2 rounded-md">
            {displayedData.map((item, index) => (
              <div key={item.id + index} className="related">
                <MiniPoster item={item} />
              </div>
            ))}
            <button
              className="w-full bg-white text-black py-2 font-bold rounded-md"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "show less" : "show more"}
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Related;
