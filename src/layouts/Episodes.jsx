/* eslint-disable react/prop-types */
import { Link, useParams, useSearchParams } from 'react-router-dom'

const Episodes = ({ episode }) => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const ep = searchParams.get('ep')

  const currentEpisodeId = `${id}?ep=${ep}`

  const isCurrent = currentEpisodeId === episode.episodeId
  return (
    <ul className={`px-2 py-2 w-full ${isCurrent ? 'bg-primary' : ' hover:bg-backGround'}`} key={episode.id}>
      <Link to={`/watch/${episode.episodeId}`}>
        <div className="flex gap-3 items-center">
          <li className={`text-lg font-bold  ${isCurrent ? 'text-black ' : 'text-primary'}`}>{episode.number}</li>
          <li title={episode.title} className={`${isCurrent ? 'text-black' : 'text-white'} text-sm line-clamp-1`}>
            {episode.title}
          </li>
        </div>
      </Link>
    </ul>
  )
}

export default Episodes
