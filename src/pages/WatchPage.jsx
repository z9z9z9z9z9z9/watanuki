import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import Player from "../components/Player";

const WatchPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ep = searchParams.get("ep");

  useEffect(() => {
    if (ep === null) {
      navigate(`/watch/${id}?ep=1`);
    }
  }, [ep, id, navigate]);

  const { data, error, isError, isLoading } = useApi(
    `/episodes/source/single/${id}`
  );

  if (isError) {
    return <div>Error loading episode. Please try again later.</div>;
  }

  return (
    <div className="pt-4">
      {data?.data ? <Player video={data?.data} /> : <Loader />}
    </div>
  );
};

export default WatchPage;
