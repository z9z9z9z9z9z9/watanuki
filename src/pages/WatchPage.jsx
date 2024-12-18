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
  const [isDubbed, setIsDubbed] = useState(false); // Default to SUBBED

  useEffect(() => {
    if (ep === null) {
      navigate(`/watch/${id}?ep=1`);
    }
  }, [ep, id, navigate]);

  const { data, error, isError, isLoading } = useApi(`/chunks/episodes/${id}`);

  if (isError) {
    return <div>Error loading episode. Please try again later.</div>;
  }

  const episodeData = data?.data?.[ep];
  const source = isDubbed
    ? episodeData?.source?.DUBBED["Vid Cloud"]
    : episodeData?.source?.SUBBED["Vid Cloud"];
  const { intro, outro, captions, title } = episodeData || {};

  return (
    <div className="pt-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>

          {/* Dubbed/Subbed Toggle */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 mx-2 rounded ${
                !isDubbed ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
              onClick={() => setIsDubbed(false)}
            >
              Subbed
            </button>
            <button
              className={`px-4 py-2 mx-2 rounded ${
                isDubbed ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
              onClick={() => setIsDubbed(true)}
            >
              Dubbed
            </button>
          </div>

          {/* Video Player */}
          <Player
            src={source}
            captions={captions}
            intro={intro}
            outro={outro}
          />
        </div>
      )}
    </div>
  );
};

export default WatchPage;
