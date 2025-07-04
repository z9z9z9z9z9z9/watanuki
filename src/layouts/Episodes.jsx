/* eslint-disable react/prop-types */
import { Link, useParams, useSearchParams } from "react-router-dom";

const Episodes = ({ episode, index }) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ep = searchParams.get("ep");

  const currentEpisodeId = `${id}?ep=${ep}`;

  console.log(`currentEPISODEID =  ${currentEpisodeId}`);
  console.log(`episode.id =  ${episode.id}`);

  const isCurrent = currentEpisodeId === episode.id.replace("::", "?");
  return (
    <ul
      className={`px-2 py-2 w-full ${
        isCurrent ? "bg-primary" : " hover:bg-black"
      }`}
      key={episode.id}
    >
      <a href={`/watch/${episode.id.replaceAll("::", "?")}`}>
        <div className="flex gap-3 items-center">
          <li
            className={`text-lg font-bold  ${
              isCurrent ? "text-black " : "text-primary"
            }`}
          >
            {index + 1}
          </li>
          <li
            title={episode.title}
            className={`${
              isCurrent ? "text-black" : "text-white"
            } text-sm line-clamp-1`}
          >
            {episode.title}
          </li>
          {episode.isFiller && <div>👻</div>}
        </div>
      </a>
    </ul>
  );
};

export default Episodes;
