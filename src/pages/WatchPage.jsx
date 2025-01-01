import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Player from '../components/Player'
import Episodes from '../layouts/Episodes'
import { useApi2 } from '../services/useApi2'
import PageNotFound from './PageNotFound'

const WatchPage = () => {
  const { id } = useParams()

  const titleId = id.split('-').slice(0, -1).join().replace(',', ' ')

  document.title = `Watch ${titleId}  Online, Free Anime Streaming Online on watanuki Anime Website`

  const [searchParams] = useSearchParams()
  const ep = searchParams.get('ep')
  const navigate = useNavigate()

  const { data, isError } = useApi2(`/episodes/${id}`)

  const episodes = data?.episodes?.episodes

  useEffect(() => {
    if (!ep && episodes?.length > 0) {
      navigate(`/watch/${episodes[0].episodeId}`, { replace: true })
    }
  }, [ep, episodes, navigate])
  if (isError) {
    return <PageNotFound />
  }

  return (
    <div className="bg-lightBg max-w-[1200px] mx-auto pt-10">
      {data?.episodes ? (
        <div className="flex flex-col">
          <Player id={id} episodeId={`${id}?ep=${ep}`} />
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
