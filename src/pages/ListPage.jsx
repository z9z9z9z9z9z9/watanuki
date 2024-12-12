/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";

const ListPage = () => {
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
    "producer",
  ];
  const { category, query = null } = useParams();

  const isValidQuery = validateQueries.includes(category);
  console.log(isValidQuery);

  if (!isValidQuery) {
    return <PageNotFound />;
  }

  const { data, isError, error, isLoading } = useApi(
    `/animes/${category}${query ? `/${query}` : ""}`
  );

  if (isError) {
    return <PageNotFound />;
  }
  return (
    <>{isLoading ? <Loader className="h-[100dvh]" /> : <div>list page</div>}</>
  );
};

export default ListPage;
