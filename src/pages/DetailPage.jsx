/* eslint-disable react/prop-types */
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

const DetailPage = () => {
  const { id } = useParams();

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
      {data && !isLoading ? (
        <div className="DetailPage">
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
        <Loader />
      )}
      <Footer />
    </>
  );
};

export default DetailPage;
