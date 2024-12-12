import React from "react";
import DynamicLayout from "./DynamicLayout";
import { useApi } from "../services/useApi";
import PageNotFound from "../pages/PageNotFound";
import Loader from "../components/Loader";

const MostPopular = () => {
  const {
    data: response,
    isError,
    error,
    isLoading,
  } = useApi(`/animes/most-popular`);

  const data = response?.data?.response?.slice(0, 10);

  if (isError) {
    return <PageNotFound />;
  }
  return (
    <div className="">
      {data && !isLoading ? (
        <DynamicLayout
          data={data}
          title="Most Popular"
          endpoint="most-popular"
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MostPopular;
