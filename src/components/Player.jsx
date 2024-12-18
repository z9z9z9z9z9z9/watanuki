import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

const Player = ({ src, captions, intro, outro }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const defaultOptions = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const availableQualities = hls.levels.map((l) => l.height);

        // Plyr initialization
        defaultOptions.controls = [
          "play-large", // The large play button in the center
          "play", // Play/pause playback
          "current-time", // The current time of playback
          "progress", // The progress bar and scrubber     for playback and buffering
          "duration",
          "settings", // Settings menu
          "airplay", // Airplay (currently Safari only)
          "fullscreen", // Toggle fullscreen
        ];
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onchange: (newLevel) => {
            hls.levels.forEach((level, index) => {
              if (level.height === newLevel) {
                hls.currentLevel = index;
              }
            });
          },
        };
        playerRef.current = new Plyr(video, defaultOptions);

        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari fallback
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [src]);

  // Skip to specific time
  const skipTo = (time) => {
    if (playerRef.current) {
      playerRef.current.currentTime = time;
    }
  };

  return (
    <div className="relative">
      {/* Skip Buttons */}
      <div className="absolute top-2 left-2 flex gap-2 z-10">
        {intro?.end && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => skipTo(intro.end)}
          >
            Skip Intro
          </button>
        )}
        {outro?.start && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => skipTo(outro.start)}
          >
            Skip Outro
          </button>
        )}
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        className="plyr w-auto h-screen"
        controls
        crossOrigin="anonymous"
        poster={captions?.map((caption) => {
          const tnumbnail = caption.lang === "Thumbnails";
          return tnumbnail.url;
        })} // Replace with actual thumbnail if available
      >
        {/* Subtitles */}
        {captions?.map((caption, index) => (
          <track
            key={index}
            kind="subtitles"
            src={caption.url}
            srcLang={caption.lang.toLowerCase()}
            label={caption.lang}
            default={caption.lang === "English"} // Default to English
          />
        ))}
      </video>
    </div>
  );
};

export default Player;
