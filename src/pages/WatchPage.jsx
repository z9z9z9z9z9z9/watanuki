import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useApi } from "../services/useApi";
import Loader from "../components/Loader";
import Player from "../components/Player";

const WatchPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ep = searchParams.get("ep");
  const [selectedServer, setSelectedServer] = useState("vidCloud");
  const [selectedAudio, setSelectedAudio] = useState("subbed");

  useEffect(() => {
    if (ep === null) {
      navigate(`/watch/${id}?ep=1`);
    }
  }, [ep, id, navigate]);

  const { data, error, isError, isLoading } = useApi(
    `/episodes/source/all/${id}`
  );

  if (isError) {
    return <div>Error loading episode. Please try again later.</div>;
  }

  const changeServer = (newServer, audio) => {
    setSelectedServer(newServer);
    setSelectedAudio(audio);
  };
  console.log(selectedAudio, selectedServer);

  return (
    <div className="bg-backGround pt-10">
      {data?.data ? (
        <>
          <div className="path">
            <h1></h1>
          </div>
          <div className="watch ">
            <div className="player">
              <Player
                video={data?.data[ep]}
                server={selectedServer}
                audio={selectedAudio}
              />
            </div>
            <div className="servers">
              <div className="subbed flex justify-between items-center mx-1 md:mx-5">
                <div className="title">SUBBED :</div>
                <div className="sub-server flex gap-3 ">
                  {data?.data[ep]?.sources.subbed.map((server) => (
                    <button
                      onClick={() => changeServer(server.id, "subbed")}
                      className={`${
                        selectedAudio === "subbed" &&
                        selectedServer === server.id
                          ? "bg-primary text-black"
                          : "bg-lightBg text-white"
                      } px-2 py-1 rounded-md`}
                      key={server.url}
                    >
                      <h1 className="">{server.id}</h1>
                    </button>
                  ))}
                </div>
              </div>
              <div className="dubbed mt-2 flex justify-between items-center  mx-1 md:mx-5">
                <div className="title">DUBBED :</div>
                <div className="sub-server flex gap-3 ">
                  {data?.data[ep]?.sources.dubbed.map((server) => (
                    <button
                      onClick={() => changeServer(server.id, "dubbed")}
                      className={`${
                        selectedAudio === "dubbed" &&
                        selectedServer === server.id
                          ? "bg-primary text-black"
                          : "bg-lightBg text-white"
                      } px-2 py-1 rounded-md`}
                      key={server.url}
                    >
                      <h1>{server.id}</h1>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="episodes flex flex-col bg-black px-2 py-2 flex-wrap mt-2">
              {data?.data.map((episode) => (
                <ul className="px-2 py-2 hover:bg-lightBg" key={episode.id}>
                  <a href={`/watch/${id}?ep=${episode.id}`}>
                    <div className="flex gap-3">
                      <li className="text-lg font-bold text-primary">
                        {episode.id}
                      </li>
                      <li>{episode.title}</li>
                    </div>
                  </a>
                </ul>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loader className="h-screen" />
      )}
    </div>
  );
};

export default WatchPage;
