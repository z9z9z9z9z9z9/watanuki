import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Episodes from "../layouts/Episodes";
import { useApi2 } from "../services/useApi2";

const WatchPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ep = searchParams.get("ep");
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useApi2(`/episodes/${id}`);

  const episodes = data?.episodes?.episodes;

  useEffect(() => {
    if (!ep && episodes?.length > 0) {
      navigate(`/watch/${episodes[0].episodeId}`, { replace: true });
    }
  }, [ep, episodes, navigate]);
  if (isError) {
    return <div>Error loading episode. Please try again later.</div>;
  }

  return (
    <div className="bg-backGround max-w-[1200px] mx-auto pt-10">
      {data?.episodes ? (
        <div className="flex flex-col md:flex-row">
          <Player id={id} episodeId={`${id}?ep=${ep}`} />
          <div className="episodes h-[50vh] md:h-screen overflow-scroll flex flex-col">
            {episodes?.map((episode, index) => (
              <div className="mt-2" key={episode.episodeId}>
                <Episodes episode={episode} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader className="h-screen" />
      )}
    </div>
  );
};

export default WatchPage;
