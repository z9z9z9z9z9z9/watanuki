/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./player.css";
import { useApi } from "../services/useApi";

const Player = ({ episodeId }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [category, setCategory] = useState("sub");

  const { data: servers } = useApi(`/servers?episodeId=${episodeId}`);

  useEffect(() => {
    if (servers) {
      setSelectedServer(servers?.data?.sub[0].serverName);
    }
  }, [servers]);
  const { data: episode } = useApi(
    `/sources?server=${selectedServer}&category=${category}&episodeId=${episodeId}`
  );

  useEffect(() => {
    if (servers) {
      setSelectedServer(servers?.data?.sub[0].serverName);
    }
  }, [servers]);
  const videoSource = episode?.data?.sources[0]?.url;

  useEffect(() => {
    const videoNode = videoRef.current;

    if (episode && videoSource) {
      // Initialize Video.js Player
      const player = videojs(videoNode, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true, // Responsive
        playbackRates: [0.5, 1, 1.5, 2], // Playback speed options
        plugins: {},
      });

      // Set HLS source
      player.src({
        src: videoSource,
        type: "application/vnd.apple.mpegurl", // HLS stream
      });

      // Add captions
      if (episode?.data?.tracks) {
        episode.data.tracks
          .filter((track) => track.kind === "captions")
          .forEach((track) => {
            player.addRemoteTextTrack(
              {
                kind: track.kind,
                src: track.file,
                label: track.label,
                language: track.label.split(" - ")[0].toLowerCase(), // Extract language code from label
                default: track.default || false,
              },
              false
            );
          });
      }

      // Save player instance
      playerRef.current = player;

      // Cleanup on component unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [episode, videoSource]);

  const changeServer = (newServer, newCategory) => {
    if (selectedServer != newServer || category != newCategory) {
      setSelectedServer(newServer);
      setCategory(newCategory);
    }
  };

  return (
    <div className="player">
      <video
        ref={videoRef}
        id="player"
        className="video-js vjs-default-skin h-full md:h-[50vh] w-full"
      ></video>
      <div className="servers mt-3 bg-black py-3 flex flex-col gap-5">
        <div className="sub flex justify-around ">
          <h1>sub</h1>
          <div className="flex  gap-4">
            {servers?.data?.sub.map((s) => (
              <button
                onClick={() => changeServer(s.serverName, "sub")}
                className={`${
                  selectedServer === s.serverName && category === "sub"
                    ? "bg-primary text-black"
                    : "bg-lightBg text-white"
                } px-2 py-1`}
                key={s.servername}
              >
                {s.serverName}
              </button>
            ))}
          </div>
        </div>
        <div className="dub flex justify-around ">
          <h1>dub</h1>
          <div className="flex  gap-4">
            {servers?.data?.dub.map((s) => (
              <button
                onClick={() => changeServer(s.serverName, "dub")}
                className={`${
                  selectedServer === s.serverName && category === "dub"
                    ? "bg-primary text-black"
                    : "bg-lightBg text-white"
                } px-2 py-1`}
                key={s.servername}
              >
                {s.serverName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
