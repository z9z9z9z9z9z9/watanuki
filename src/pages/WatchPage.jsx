import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Player from '../components/Player'
import Episodes from '../layouts/Episodes'
import { useApi } from '../services/useApi'
import PageNotFound from './PageNotFound'

const WatchPage = () => {
  const { id } = useParams()

  const titleId = id.split('-').slice(0, -1).join().replace(',', ' ')

  document.title = `Watch ${titleId}  Online, Free Anime Streaming Online on watanuki Anime Website`

  const [searchParams] = useSearchParams()
  const ep = searchParams.get('ep')
  const navigate = useNavigate()

  const { data, isError } = useApi(`/episodes/${id}`)

  const episodes = data?.data

  useEffect(() => {
    if (!ep && episodes?.length > 0) {
      navigate(`${episodes[0].id}`, { replace: true })
    }
  }, [ep])
  if (isError) {
    return <PageNotFound />
  }

  return (
    <div className="bg-backGround max-w-[1200px] mx-auto pt-10">
      {data?.data ? (
        <div className="flex flex-col">
          {ep && id && <Player id={id} episodeId={`${id}?ep=${ep}`} />}
          <div className="episodes mt-2 h-[50vh] md:h-screen overflow-scroll flex flex-col">
            {episodes?.map((episode) => (
              <div className="" key={episode.episodeId}>
                <Episodes episode={episode} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader className="h-screen" />
      )}
    </div>
  )
}

export default WatchPage
