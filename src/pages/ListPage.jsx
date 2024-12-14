/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useApi, useInfiniteApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Heading from "../components/Heading";

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

  const endpoint = `/animes/${category}${query ? `/${query}` : ""}?page=`;
  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteApi(endpoint);

  if (isError) {
    return <PageNotFound />;
  }
  const pages = data?.pages;

  return (
    <div className="list-page pt-20">
      {pages && !isLoading ? (
        <InfiniteScroll
          dataLength={data?.pages.flat().length || 0} //This is important field to render the next data
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Loader />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Heading>
            {query ? "" : category} {query} Anime
          </Heading>
          <div className="flex flex-wrap mx-2 md:mx-5 justify-between items-center">
            {pages?.map((page) => (
              <>
                {page.data.response.map((item) => (
                  <div key={item.id} className="flw-item">
                    <Image data={item} />
                  </div>
                ))}
              </>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <Loader className="h-[100dvh]" />
      )}
    </div>
  );
};

export default ListPage;
