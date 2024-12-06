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
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { data, isLoading, error, isError } = useApi("/home");

  if (isError) notify("error", error.message);
  return (
    <div className="relative">
      {isLoading ? (
        <Loader className={"loader"} />
      ) : (
        <>
          <HeroBanner slides={data?.data?.spotlight} />
          <TrendingLayout data={data?.data?.trending} />
          <div className="grid mx-5 grid-cols-12 gap-4 my-5">
            <DynamicLayout dataType="Top Airing" data={data?.data?.topAiring} />
            <DynamicLayout
              dataType="Most Popular"
              data={data?.data?.mostPopular}
            />
            <DynamicLayout
              dataType="Most Favorite"
              data={data?.data?.mostFavorite}
            />
            <DynamicLayout
              dataType="Latest Completed"
              data={data?.data?.latestCompleted}
            />
          </div>
          <div className="row grid justify-center items-center grid-cols-12 mx-2">
            <div className="left col-span-12 xl:col-span-9">
              <MainLayout
                dataType="Latest Episode"
                data={data?.data?.latestEpisode}
              />
              <MainLayout dataType="New Added" data={data?.data?.newAdded} />
              <MainLayout
                dataType="Top Upcoming"
                data={data?.data?.topUpcoming}
              />
            </div>
            <div className="right col-span-12 xl:col-span-3">
              <GenresLayout />
              <Top10Layout />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
