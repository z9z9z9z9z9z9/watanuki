import React from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import notify from "../utils/Toast";
import PageNotFound from "./PageNotFound";
import ListPage from "./ListPage";
import InfoPage from "./InfoPage";

const Dynamic = () => {
  const validateQueries = [
    "top-airing",
    "most-popular",
    "most-favorite",
    "completed",
    "recently-added",
    "recently-updated",
    "top-upcoming",
    "subbed-anime",
    "dubbed-anime",
    "movie",
    "tv",
    "ova",
    "ona",
    "special",

    "az-list",
    "genre",
  ];
  const { category, query = null } = useParams();

  const isValidQuery = validateQueries.includes(category);
  const { data, isError, error, isLoading } = isValidQuery
    ? useApi(`/animes/${category}${query ? `/${query}` : ""}`)
    : useApi(`/anime/${category}`);

  if (isError) {
    return <PageNotFound />;
  }
  return (
    <>
      {isLoading ? (
        <Loader className="h-[100dvh]" />
      ) : isValidQuery ? (
        <ListPage data={data?.data} />
      ) : (
        <InfoPage data={data?.data} />
      )}
    </>
  );
};

export default Dynamic;
