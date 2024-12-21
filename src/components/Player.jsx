/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import "./player.css";
import Plyr from "plyr";

const Player = ({ video, server, audio }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const thumbnail = video.captions.find(
    (caption) => caption.lang === "Thumbnails"
  );

  // Remove the thumbnail from the array
  video.captions = video.captions.filter(
    (caption) => caption.lang !== "Thumbnails"
  );

  const videoSrc = video.sources[audio].find((s) => s.id === server);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const defaultOptions = {};
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 4, // Buffer only 10 seconds of video
          maxMaxBufferLength: 4, // Cap maximum buffer size at 30 seconds
        });
        hls.loadSource(videoSrc.url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hls.levels.map((l) => l.height);

          defaultOptions.controls = [
            "play-large", // The large play button in the center
            "play", // Play/pause playback
            "current-time", // The current time of playback
            "progress", // The progress bar and scrubber for seeking
            "duration", // The full duration of the media
            "rewind",
            "fast-forward",
            "captions", // Toggle captions
            "settings", // Settings menu
            "pip", // Picture-in-picture (for supported browsers)
            "airplay", // Airplay (for Apple devices
            "fullscreen", // Toggle fullscreen
          ];
          defaultOptions.autoplay = false;
          defaultOptions.quality = {
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
          };
          (defaultOptions.captions = { active: true, update: true }), // Enable captions
            (playerRef.current = new Plyr(video, defaultOptions));
          video.play();
        });

        return () => {
          hls.destroy(); // Cleanup on unmount
        };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Use native HLS support for Safari
        video.src = src;
      }
    }

    return () => {
      // Dispose of the player if initialized
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoSrc]);

  return (
    <div className="player">
      <video
        ref={videoRef}
        id="player"
        className="player video-js vjs-default-skin h-full md:h-[50vh] w-full"
        controls
      >
        {video?.captions?.map((caption, index) => (
          <track
            key={index}
            kind="captions"
            label={caption.lang}
            srcLang="en"
            src={caption.url}
            default
          />
        ))}
      </video>
    </div>
  );
};

export default Player;
