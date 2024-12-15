import React from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";
import Loader from "../components/Loader";
import Heading from "../components/Heading";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Footer from "../components/Footer";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteApi(`/search?keyword=${keyword}&page=`);

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
          loader={<Loader className="h-fit" />}
          endMessage={<Footer />}
        >
          <Heading>Search results of {keyword}</Heading>
          <div className="flex flex-wrap mx-2 md:mx-5 justify-between items-center">
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

export default SearchResult;
