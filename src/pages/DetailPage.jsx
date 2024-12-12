/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import InfoLayout from "../layouts/InfoLayout";
import Recommended from "../layouts/Recommended";
import MostPopular from "../layouts/MostPopular";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div className="DetailPage">
      <InfoLayout id={id} />
      <div className="row grid items-start gap-3 grid-cols-12">
        <div className="recomendation col-span-12 xl:col-span-9">
          <Recommended id={id} />
        </div>
        <div className="most-popular px-2 bg-lightBg  col-span-12 mt-2 xl:col-span-3">
          <MostPopular />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
