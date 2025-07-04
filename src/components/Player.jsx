/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useApi } from "../services/useApi";
import config from "../config/config";

const Player = ({ episodeId }) => {
  const playerContainer = useRef(null);
  // const artInstance = useRef(null);

  const [category, setCategory] = useState("sub");

  // const { data: servers } = useApi(
  //   episodeId ? `/servers?id=${episodeId}` : null
  // );

  // const { data: episode } = useApi(
  //   selectedServer && category && episodeId
  //     ? `/stream?server=${selectedServer}&type=${category}&id=${episodeId}`
  //     : null
  // );

  // const videoSource = episode?.data?.link.file;
  // const tracks = episode?.data?.tracks;

  // useEffect(() => {
  //   if (!videoSource || !playerContainer.current) return;

  //   // Clean up previous instance
  //   if (artInstance.current) {
  //     artInstance.current.destroy(false);
  //   }

  //   const proxyUrl = createProxyUrl(videoSource);

  //   artInstance.current = new Artplayer({
  //     container: playerContainer.current,
  //     url: proxyUrl,
  //     autoplay: true,
  //     poster: tracks.find((e) => e.type === "thumbnail"),
  //     type: "customHls",
  //     setting: true,
  //     fullscreen: true,
  //     fullscreenWeb: true,
  //     playsInline: true,
  //     autoSize: true,
  //     autoMini: true,
  //     mutex: true,
  //     theme: "#23ade5",

  //     customType: {
  //       customHls: (video, url) => {
  //         if (Hls.isSupported()) {
  //           const hls = new Hls();
  //           hls.loadSource(url);
  //           hls.attachMedia(video);
  //           artInstance.current.on("destroy", () => hls.destroy());
  //         } else {
  //           video.src = url;
  //         }
  //       },
  //     },
  //     settings: [
  //       {
  //         width: 200,
  //         html: "Subtitle",
  //         tooltip: "Bilingual",
  //         icon: '<img width="22" height="22" src="/assets/img/subtitle.svg">',
  //         selector: [
  //           {
  //             html: "Display",
  //             tooltip: "Show",
  //             switch: true,
  //             onSwitch: function (item) {
  //               item.tooltip = item.switch ? "Hide" : "Show";
  //               artInstance.current.subtitle.show = !item.switch;
  //               return !item.switch;
  //             },
  //           },
  //           {
  //             default: true,
  //             html: "Bilingual",
  //             url: "/assets/sample/subtitle.srt",
  //           },
  //           {
  //             html: "Chinese",
  //             url: "/assets/sample/subtitle.cn.srt",
  //           },
  //           {
  //             html: "Japanese",
  //             url: "/assets/sample/subtitle.jp.srt",
  //           },
  //         ],
  //         onSelect: function (item) {
  //           art.subtitle.switch(item.url, {
  //             name: item.html,
  //           });
  //           return item.html;
  //         },
  //       },
  //       {
  //         html: "Switcher",
  //         icon: '<img width="22" height="22" src="/assets/img/state.svg">',
  //         tooltip: "OFF",
  //         switch: false,
  //         onSwitch: function (item) {
  //           item.tooltip = item.switch ? "OFF" : "ON";
  //           console.info("You clicked on the custom switch", item.switch);
  //           return !item.switch;
  //         },
  //       },
  //       {
  //         html: "Slider",
  //         icon: '<img width="22" height="22" src="/assets/img/state.svg">',
  //         tooltip: "5x",
  //         range: [5, 1, 10, 0.1],
  //         onRange: function (item) {
  //           return item.range[0] + "x";
  //         },
  //       },
  //       {
  //         html: "Button",
  //         icon: '<img width="22" height="22" src="/assets/img/state.svg">',
  //         tooltip: "tooltip",
  //         onClick() {
  //           return "Button clicked";
  //         },
  //       },
  //     ],
  //   });

  //   return () => {
  //     if (artInstance.current) {
  //       artInstance.current.destroy(false);
  //     }
  //   };
  // }, [videoSource]);

  // function createProxyUrl(url) {
  //   const { serverUrl, proxyUrl } = config;

  //   const headers = {
  //     origin: "https://megacloud.tv",
  //     Referer: "https://megacloud.tv/",
  //     "User-Agent":
  //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  //   };

  //   if (!url) return "";
  //   if (url.endsWith(".m3u8")) {
  //     return `${proxyUrl}/m3u8-proxy?url=${url}&headers=${encodeURIComponent(
  //       JSON.stringify(headers)
  //     )}`;
  //   } else {
  //     return `${serverUrl}?url=${url}`;
  //   }
  // }

  // const changeServer = (serverName, type) => {
  //   if (serverName !== selectedServer || type !== category) {
  //     setSelectedServer(serverName);
  //     setCategory(type);
  //   }
  // };
  const changeCategory = (newType) => {
    if (newType !== category) {
      setCategory(newType);
    }
  };

  return (
    <div className="w-full">
      <div
        ref={playerContainer}
        className="w-full h-[60vh] rounded overflow-hidden"
      >
        <iframe
          src={`https://megaplay.buzz/stream/s-2/${episodeId
            .split("ep=")
            .pop()}/${category}`}
          width="100%"
          height="100%"
          allowfullscreen
        ></iframe>
      </div>

      {/* Server Switch UI */}
      {/* <div className="servers mt-3 bg-black py-3 px-4 flex flex-col gap-4">
        {servers?.data?.sub && (
          <div className="sub flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-white">Sub:</span>
            {servers.data.sub.map((s) => (
              <button
                key={s.name}
                onClick={() => changeServer(s.name, "sub")}
                className={`px-3 py-1 rounded ${
                  selectedServer === s.name && category === "sub"
                    ? "bg-primary text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
        {servers?.data?.dub && (
          <div className="dub flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-white">Dub:</span>
            {servers.data.dub.map((s) => (
              <button
                key={s.name}
                onClick={() => changeServer(s.name, "dub")}
                className={`px-3 py-1 rounded ${
                  selectedServer === s.name && category === "dub"
                    ? "bg-primary text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div> */}
      <div className="category flex gap-5 my-4 bg-black py-4 justify-center">
        <button
          onClick={() => changeCategory("sub")}
          className={`${
            category === "sub" ? "bg-primary text-black" : "bg-lightBg"
          } px-3 py-1 rounded-sm `}
        >
          SUB
        </button>
        <button
          onClick={() => changeCategory("dub")}
          className={`${
            category === "dub" ? "bg-primary text-black" : "bg-lightBg"
          } px-3 py-1 rounded-sm `}
        >
          DUB
        </button>
      </div>
    </div>
  );
};

export default Player;
