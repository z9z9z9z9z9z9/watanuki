/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import Hls from 'hls.js'
import './player.css'
import { API_BASE_URL, useApi } from '../services/useApi'
import config from '../config/config'

const Player = ({ episodeId }) => {
  const videoRef = useRef(null) // Use useRef to store the video DOM node
  const playerRef = useRef(null) // Use useRef to store the player instance
  const [selectedServer, setSelectedServer] = useState(null)
  const [category, setCategory] = useState('sub')
  const [selectedTrack, setSelectedTrack] = useState(null)

  const { data: servers } = useApi(episodeId ? `/servers?id=${episodeId}` : null)

  useEffect(() => {
    if (servers) {
      console.log(servers)
      setSelectedServer(servers?.data?.sub[2]?.name)
    }
    console.log(selectedServer)
  }, [servers, episodeId])

  const { data: episode } = useApi(selectedServer && category && episodeId ? `/stream?server=${selectedServer}&type=${category}&id=/watch/${episodeId}` : null)
  const { serverUrl, proxyUrl } = config

  const videoSource = episode?.data?.streamingLink.link.file || null
  const proxySource = createProxyUrl(videoSource)
  const tracks = episode?.data?.tracks && episode?.data?.tracks.filter((track) => track.kind !== 'thumbnails')
  const poster = episode?.data?.tracks && episode?.data?.tracks.filter((track) => track.kind === 'thumbnails')

  console.log(videoSource)

  const initializePlayer = () => {
    setSelectedTrack(null)
    console.log(videoSource)

    if (videoRef.current && serverUrl && videoSource) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(proxySource)
        hls.attachMedia(videoRef.current)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hls.levels.map((l) => l.height)

          const player = new Plyr(videoRef.current, {
            controls: ['play-large', 'play', 'current-time', 'progress', 'duration', 'captions', 'settings', 'fullscreen'],
            autoplay: true,
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
                    hls.currentLevel = index
                  }
                })
              },
            },
            previewThumbnails: createProxyUrl(poster[0]?.file || ''),
          })

          playerRef.current = player // Store player instance in ref
        })
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoSource
      }
    }
  }
  useEffect(() => {
    initializePlayer()
  }, [videoSource])

  const changeServer = (newServer, newCategory) => {
    if (selectedServer !== newServer || category !== newCategory) {
      setSelectedServer(newServer)
      setCategory(newCategory)
      initializePlayer()
    }
  }
  useEffect(() => {
    if (selectedTrack === null && tracks && tracks.length > 0) {
      setSelectedTrack(tracks.find((track) => track.label === 'English'))
    }
  }, [selectedTrack, tracks])
  const changeTrack = (newtrack) => {
    if (newtrack.label !== selectedTrack.label) {
      setSelectedTrack(newtrack)
    }
  }
  function createProxyUrl(url) {
    console.log('url : ' + url)

    // const ref = 'https://megacloud.blog/'
    const headers = {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.5',
      origin: 'https://megacloud.tv',
      Referer: 'https://megacloud.tv/',
      'Sec-Ch-Ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Gpc': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    }

    if (url) {
      if (url.endsWith('.m3u8')) {
        const proxy = `${proxyUrl}/m3u8-proxy?url=${url}&headers=${JSON.stringify(headers)}`
        console.log('proxy is : ' + proxy)

        return proxy
      } else {
        const proxy = `${serverUrl}?url=${url}`
        return proxy
      }
    }
  }

  return (
    <>
      <div className="player h-full w-full">
        <div className="video w-full h-full">
          <video
            ref={videoRef} // Use ref for the video DOM node
            id="my-player"
            poster={poster?.file}
            className="video-js my-video vjs-default-skin h-full w-full"
            controls
          >
            {selectedTrack && <track key={selectedTrack?.label} src={createProxyUrl(selectedTrack?.file)} kind={selectedTrack?.kind} srcLang={selectedTrack?.label} label={selectedTrack?.label} />}
          </video>
        </div>
        {tracks && tracks.length > 0 && (
          <div className="captions">
            <h1 className="text-sm font-bold text-center mt-2">Tracks</h1>
            <div className="flex mt-2  flex-wrap gap-2">
              {tracks.map((track) => (
                <button
                  onClick={() => changeTrack(track)}
                  key={track.label}
                  className={`px-2 py-1 bg-backGround ${selectedTrack && selectedTrack.label === track.label ? 'bg-primary text-black' : 'bg-backGround text-white'}`}
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="servers mt-3 bg-black py-3 flex flex-col gap-5">
          {servers?.data?.sub && (
            <div className="sub flex justify-around items-center ">
              <h1 className="text-sm font-bold">Sub : </h1>
              <div className="flex gap-2 md:gap-4">
                {servers?.data?.sub.map((s) => (
                  <button
                    onClick={() => changeServer(s.name, 'sub')}
                    className={`${selectedServer === s.name && category === 'sub' ? 'bg-primary text-black' : 'bg-lightBg text-white'} px-2 py-1 rounded-md`}
                    key={s.name}
                  >
                    {s.name}
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
                    onClick={() => changeServer(s.name, 'dub')}
                    className={`${selectedServer === s.name && category === 'dub' ? 'bg-primary text-black' : 'bg-lightBg text-white'} px-2 py-1 rounded-md`}
                    key={s.name}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Player
