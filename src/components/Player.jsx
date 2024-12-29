/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import "./player.css";
import Plyr from "plyr";
import { useApi } from "../services/useApi";

const Player = ({ episodeId }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [category, setCategory] = useState("sub");

  console.log(Boolean(episodeId != null));

  const { data: servers } = episodeId
    ? useApi(`/servers?episodeId=${episodeId}`)
    : useApi(null);

  useEffect(() => {
    if (servers) {
      setSelectedServer(servers?.data?.sub[0].serverName);
    }
  }, [servers]);

  const { data: episode } =
    selectedServer && category && episodeId
      ? useApi(
          `/sources?server=${selectedServer}&category=${category}&episodeId=${episodeId}`
        )
      : useApi(null);

  const videoSource = episode?.data?.sources[0]?.url;

  useEffect(() => {
    const video = videoRef.current;
    if (episode && videoSource) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSource);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hls.levels.map((l) => l.height);
          const player = new Plyr(video, {
            controls: [
              "play-large",
              "play",
              "current-time",
              "progress",
              "duration",
              "captions",
              "settings",
              "fullscreen",
            ],
            autoplay: false,
            captions: {
              active: true,
              update: true,
            },
            quality: {
              default: availableQualities[0],
              options: availableQualities,
              forced: true,
              onChange: (quality) => {
                hls.levels.forEach((level, index) => {
                  if (level.height === quality) {
                    hls.currentLevel = index;
                  }
                });
              },
            },
          });

          // Add captions to the Plyr instance
          if (episode?.data?.tracks) {
            episode.data.tracks
              .filter((track) => track.kind === "captions")
              .forEach((track) => {
                const trackElement = document.createElement("track");
                trackElement.kind = track.kind;
                trackElement.label = track.label;
                trackElement.srclang = track.label
                  .split(" - ")[0]
                  .toLowerCase(); // Extract language code
                trackElement.src = track.file;
                if (track.default) {
                  trackElement.default = true;
                }
                video.appendChild(trackElement);
              });
          }

          playerRef.current = player;
        });

        return () => {
          if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
          }
          hls.destroy();
        };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSource;
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [episode, videoSource]);

  const changeServer = (newServer, newCategory) => {
    if (selectedServer !== newServer || category !== newCategory) {
      setSelectedServer(newServer);
      setCategory(newCategory);
    }
  };

  return (
    <div className="player">
      <video
        ref={videoRef}
        id="player"
        className="player video-js vjs-default-skin h-full md:h-[50vh] w-full"
        controls
      ></video>
      <div className="servers mt-3 bg-black py-3 flex flex-col gap-5">
        <div className="sub flex justify-around ">
          <h1>Sub</h1>
          <div className="flex gap-4">
            {servers?.data?.sub.map((s) => (
              <button
                onClick={() => changeServer(s.serverName, "sub")}
                className={`${
                  selectedServer === s.serverName && category === "sub"
                    ? "bg-primary text-black"
                    : "bg-lightBg text-white"
                } px-2 py-1`}
                key={s.serverName}
              >
                {s.serverName}
              </button>
            ))}
          </div>
        </div>
        <div className="dub flex justify-around ">
          <h1>Dub</h1>
          <div className="flex gap-4">
            {servers?.data?.dub.map((s) => (
              <button
                onClick={() => changeServer(s.serverName, "dub")}
                className={`${
                  selectedServer === s.serverName && category === "dub"
                    ? "bg-primary text-black"
                    : "bg-lightBg text-white"
                } px-2 py-1`}
                key={s.serverName}
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
