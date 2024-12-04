import Header from "../components/Header";
import Loader from "../components/Loader";
import { useApi } from "../services/useApi";
import HeroBanner from "../components/HeroBanner";
import notify from "../utils/Toast";
import TrendingLayout from "../layouts/TrendingLayout";
import DynamicLayout from "../layouts/DynamicLayout";

const Home = () => {
  const { data, isLoading, error, isError } = useApi("/home");

  if (isError) notify("error", error.message);
  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader className={"loader"} />
      ) : (
        <>
          <HeroBanner slides={data?.data?.spotlight} />
          <TrendingLayout data={data?.data?.trending} />
          <div className="grid mx-5 grid-cols-12 gap-4 mt-5">
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
        </>
      )}
    </div>
  );
};

export default Home;
