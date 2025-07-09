import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import InfoLayout from "../layouts/InfoLayout";
import Recommended from "../layouts/Recommended";
import MostPopular from "../layouts/MostPopular";
import MoreSeasons from "../layouts/MoreSeasons";
import Related from "../layouts/Related";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const DetailPage = () => {
  const { id } = useParams();

  const titleId = id.split("-").slice(0, -1).join(" ").replace(",", " ");

  const endsWithNumber = /\d$/;
  const result = endsWithNumber.test(id);

  if (!result) {
    return <PageNotFound />;
  }

  const { data: response, isError, error, isLoading } = useApi(`/anime/${id}`);
  const data = response?.data;

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{titleId}</title>
        <meta property="og:title" content="detail - watanuki" />
      </Helmet>
      {data && !isLoading ? (
        <div className="DetailPage pt-10">
          <InfoLayout data={data} />
          <div className="row grid items-start gap-3 px-2 grid-cols-12">
            <div className="left col-span-12 xl:col-span-9">
              {data.moreSeasons.length !== 0 && (
                <MoreSeasons data={data.moreSeasons} />
              )}
              {data.recommended && (
                <div className="recomendation">
                  <Recommended data={data.recommended} />
                </div>
              )}
            </div>

            <div className="right  col-span-12 mt-2 xl:col-span-3">
              {data.related.length !== 0 && (
                <div className="related">
                  <Related data={data.related} />
                </div>
              )}
              {data.mostPopular && (
                <div className="most-popular col-span-12 mt-2 xl:col-span-3">
                  <MostPopular data={data.mostPopular} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader className="h-[100dvh]" />
      )}
      <Footer />
    </>
  );
};

export default DetailPage;
