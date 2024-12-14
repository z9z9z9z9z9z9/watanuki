import Header from "../components/Header";
import Loader from "../components/Loader";
import { useApi } from "../services/useApi";
import HeroBanner from "../components/HeroBanner";
import notify from "../utils/Toast";
import TrendingLayout from "../layouts/TrendingLayout";
import DynamicLayout from "../layouts/DynamicLayout";
import MainLayout from "../layouts/MainLayout";
import GenresLayout from "../layouts/GenresLayout";
import Top10Layout from "../layouts/Top10Layout";
import useGenresStore from "../store/genresStore";
import { useEffect } from "react";
import useTopTenStore from "../store/toptenStore";
import Footer from "../components/Footer";

const Home = () => {
  document.title =
    "Watch Anime Online, Free Anime Streaming Online on watanuki Anime Website";
  const { data, isLoading, error, isError } = useApi("/home");

  const setGenres = useGenresStore((state) => state.setGenres);
  const setTopTen = useTopTenStore((state) => state.setTopTen);

  useEffect(() => {
    if (data?.data) {
      setGenres(data.data.genres);
      setTopTen(data.data.top10);
    }
  }, [data]);

  if (isError) {
    notify("error", error.message);
    return;
  }
  return (
    <div className="relative">
      {isLoading ? (
        <Loader className="loader" />
      ) : (
        <>
          <HeroBanner slides={data?.data?.spotlight} />
          <TrendingLayout data={data?.data?.trending} />
          <div className="grid mx-2 grid-cols-12 gap-4 my-5">
            <DynamicLayout
              title="Top Airing"
              endpoint="top-airing"
              data={data?.data?.topAiring}
            />
            <DynamicLayout
              title="Most Popular"
              endpoint="most-popular"
              data={data?.data?.mostPopular}
            />
            <DynamicLayout
              title="Most Favorite"
              endpoint="most-favorite"
              data={data?.data?.mostFavorite}
            />
            <DynamicLayout
              title="Latest Completed"
              endpoint="completed"
              data={data?.data?.latestCompleted}
            />
          </div>
          <div className="row grid my-10 gap-2 justify-center grid-cols-12 sm:mx-2">
            <div className="left col-span-12 xl:col-span-9">
              <MainLayout
                title="Latest Episode"
                endpoint="recently-updated"
                data={data?.data?.latestEpisode}
              />
              <MainLayout
                title="New Added"
                endpoint="recently-added"
                data={data?.data?.newAdded}
              />
              <MainLayout
                title="Top Upcoming"
                endpoint="top-upcoming"
                data={data?.data?.topUpcoming}
              />
            </div>
            <div className="right col-span-12 xl:col-span-3">
              <GenresLayout />
              <Top10Layout />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
