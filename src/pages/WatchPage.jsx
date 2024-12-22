import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Episodes from "../layouts/Episodes";

const WatchPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ep = searchParams.get("ep");
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useApi(`/episodes/${id}`);

  const episodes = data?.data?.episodes;

  useEffect(() => {
    if (!ep && episodes?.length > 0) {
      navigate(`/watch/${episodes[0].episodeId}`, { replace: true });
    }
  }, [ep, episodes, navigate]);
  if (isError) {
    return <div>Error loading episode. Please try again later.</div>;
  }

  return (
    <div className="bg-backGround pt-10">
      {data?.data ? (
        <>
          <Player id={id} episodeId={`${id}?ep=${ep}`} />
          {episodes?.map((episode, index) => (
            <div className="flex bg-backGround" key={episode.episodeId}>
              <Episodes episode={episode} />
            </div>
          ))}
        </>
      ) : (
        <Loader className="h-screen" />
      )}
    </div>
  );
};

export default WatchPage;
