/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useApi, useInfiniteApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ListPage = () => {
  const [page, setPage] = useState(1);
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

  const endpoint = `/animes/${category}${
    query ? `/${query}` : ""
  }?page=${page}`;
  const { data, isError, error, isLoading } = useApi(endpoint);

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <>
      {isLoading ? (
        <Loader className="h-[100dvh]" />
      ) : (
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {items}
        </InfiniteScroll>
      )}
    </>
  );
};

export default ListPage;
