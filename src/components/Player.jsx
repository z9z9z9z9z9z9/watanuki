/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css"; // Import video.js CSS
import videojs from "video.js";
import Hls from "hls.js";
import "./player.css";
import { useApi2 } from "../services/useApi2";

const Player = ({ episodeId }) => {
  const videoRef = useRef(null); // Use useRef to store the video DOM node
  const playerRef = useRef(null); // Use useRef to store the player instance
  const [selectedServer, setSelectedServer] = useState(null);
  const [category, setCategory] = useState("sub");

  const { data: servers } = episodeId
    ? useApi2(`/servers?episodeId=${episodeId}`)
    : useApi2(null);

  useEffect(() => {
    if (servers) {
      setSelectedServer(servers?.data?.sub[0]?.serverName);
    }
  }, [servers, episodeId]);

  const { data: episode } =
    selectedServer && category && episodeId
      ? useApi2(
          `/sources?server=${selectedServer}&category=${category}&episodeId=${episodeId}`
        )
      : useApi2(null);

  const videoSource = episode?.data?.sources[0]?.url;
  const tracks =
    episode?.data?.tracks &&
    episode?.data?.tracks.filter((track) => track.kind !== "thumbnails");

  const poster =
    episode?.data?.tracks &&
    episode?.data?.tracks.filter((track) => track.kind === "thumbnails");

  const initializePlayer = () => {
    if (videoRef.current && videoSource) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSource);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hls.levels.map((l) => l.height);

          const player = videojs(videoRef.current, {
            poster: poster.file,
            controls: true,
            preload: "auto",
            autoplay: true,
            fluid: true, // Make player fluid to fit container
            controlBar: {
              pictureInPictureToggle: true,
              playbackRateMenuButton: true,
              qualityMenu: {
                options: availableQualities,
                default: availableQualities[0],
                onChange: (quality) => {
                  hls.levels.forEach((level, index) => {
                    if (level.height === quality) {
                      hls.currentLevel = index;
                    }
                  });
                },
              },
            },
          });

          playerRef.current = player; // Store player instance in ref
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoSource;

        const player = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: "auto",
        });
        playerRef.current = player; // Store player instance in ref
      }
    }
  };
  useEffect(() => {
    initializePlayer();
  }, [videoSource]);

  const changeServer = (newServer, newCategory) => {
    if (selectedServer !== newServer || category !== newCategory) {
      setSelectedServer(newServer);
      setCategory(newCategory);
      initializePlayer();
    }
  };

  return (
    <>
      <div className="player h-full w-full">
        <div className="video w-full h-full">
          <video
            ref={videoRef} // Use ref for the video DOM node
            id="my-player"
            className="video-js my-video vjs-default-skin h-full w-full"
            controls
          >
            {tracks &&
              tracks.length > 0 &&
              tracks?.map((track) => (
                <track
                  key={track.label}
                  src={track.file}
                  kind={track.kind}
                  srcLang={track.label}
                  label={track.label}
                  default={track.default}
                />
              ))}
          </video>
        </div>
        <div className="servers mt-3 bg-black py-3 flex flex-col gap-5">
          {servers?.data?.sub && (
            <div className="sub flex justify-around items-center ">
              <h1 className="text-sm font-bold">Sub : </h1>
              <div className="flex gap-2 md:gap-4">
                {servers?.data?.sub.map((s) => (
                  <button
                    onClick={() => changeServer(s.serverName, "sub")}
                    className={`${
                      selectedServer === s.serverName && category === "sub"
                        ? "bg-primary text-black"
                        : "bg-lightBg text-white"
                    } px-2 py-1 rounded-md`}
                    key={s.serverName}
                  >
                    {s.serverName}
                  </button>
                ))}
              </div>
            </div>
          )}
          {servers?.data?.dub && (
            <div className="dub flex justify-around items-center ">
              <h1 className="text-sm font-bold">Dub : </h1>
              <div className="flex gap-2 md:gap-4">
                {servers?.data?.dub.map((s) => (
                  <button
                    onClick={() => changeServer(s.serverName, "dub")}
                    className={`${
                      selectedServer === s.serverName && category === "dub"
                        ? "bg-primary text-black"
                        : "bg-lightBg text-white"
                    } px-2 py-1 rounded-md`}
                    key={s.serverName}
                  >
                    {s.serverName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
