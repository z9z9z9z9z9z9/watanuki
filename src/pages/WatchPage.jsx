import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Episodes from "../layouts/Episodes";
import { useApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";

const WatchPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const ep = searchParams.get("ep");

  const { data, isError } = useApi(`/episodes/${id}`);
  const episodes = data?.data;

  // Update document title
  useEffect(() => {
    if (id) {
      const titleId = id.split("-").slice(0, -1).join(" ");
      document.title = `Watch ${titleId} Online, Free Anime Streaming Online on Watanuki Anime Website`;
    }
  }, [id]);

  // Auto-redirect to first episode if no `ep` param exists
  useEffect(() => {
    if (!ep && Array.isArray(episodes) && episodes.length > 0) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("ep", episodes[0].id.split("ep=").pop());
        return newParams;
      });
    }
  }, [ep, episodes, setSearchParams]);

  if (isError) {
    return <PageNotFound />;
  }

  if (!episodes) {
    return <Loader className="h-screen" />;
  }

  return (
    <div className="bg-backGround max-w-[1200px] mx-auto pt-10">
      <div className="flex flex-col">
        {ep && id && <Player id={id} episodeId={`${id}?ep=${ep}`} />}

        <div className="episodes mt-2 h-[50vh] md:h-screen overflow-scroll flex flex-col">
          {episodes &&
            episodes.map((episode, i) => (
              <div key={episode.id}>
                <Episodes episode={episode} index={i} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
