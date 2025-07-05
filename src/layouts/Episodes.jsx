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
      className={`w-full rounded-md p-3 transition-all duration-200 ${
        isCurrent ? "bg-primary" : "hover:bg-black"
      }`}
    >
      <a
        href={`/watch/${episode.id.replaceAll("::", "?")}`}
        className="block w-full"
      >
        <div className="flex gap-3 items-center">
          <li
            className={`text-base font-bold ${
              isCurrent ? "text-black" : "text-primary"
            }`}
          >
            {index + 1}
          </li>
          <li
            title={episode.title}
            className={`flex-1 ${
              isCurrent ? "text-black" : "text-white"
            } text-sm truncate`}
          >
            {episode.title}
          </li>
          {episode.isFiller && <span title="Filler">👻</span>}
        </div>
      </a>
    </ul>
  );
};

export default Episodes;
