import Header from "../components/Header";
import Loader from "../components/Loader";
import { useApi } from "../services/useApi";
import HeroBanner from "../components/HeroBanner";
import notify from "../utils/Toast";

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
        </>
      )}
    </div>
  );
};

export default Home;
