import Header from "../components/Header";
import Loader from "../components/Loader";
import { useApi } from "../services/useApi";
import HeroBanner from "../components/HeroBanner";
import notify from "../utils/Toast";
import TrendingLayout from "../layouts/TrendingLayout";

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
        </>
      )}
    </div>
  );
};

export default Home;
