/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useInfiniteApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Heading from "../components/Heading";
import AZ from "../layouts/AZ";
import React from "react";
import Footer from "../components/Footer";

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

  if (!isValidQuery) {
    return <PageNotFound />;
  }
  document.title = `${category} animes`;

  const endpoint = `/animes/${category}${query ? `/${query}` : ""}?page=`;
  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteApi(endpoint);

  if (isError) {
    return <PageNotFound />;
  }
  const pages = data?.pages;

  return (
    <div className="list-page pt-14">
      {category === "az-list" && <AZ selected={query} />}
      {pages && !isLoading ? (
        <InfiniteScroll
          dataLength={data?.pages.flat().length || 0} //This is important field to render the next data
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Loader className="h-fit" />}
          endMessage={<Footer />}
        >
          <Heading>
            {query ? "" : category} {query} Anime
          </Heading>
          <div className="flex flex-wrap justify-around items-center">
            {pages?.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.data.response.map((item, index) => (
                  <div key={item.id + index} className="flw-item">
                    <Image data={item} />
                  </div>
                ))}
              </React.Fragment>
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
