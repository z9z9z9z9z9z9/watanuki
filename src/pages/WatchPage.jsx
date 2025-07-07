import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Episodes from "../layouts/Episodes";
import { useApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";
import { MdTableRows } from "react-icons/md";
import { HiMiniViewColumns } from "react-icons/hi2";

const WatchPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState("row");

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

  const currentEp =
    episodes &&
    ep !== null &&
    episodes.find((e) => e.id.split("ep=").pop() === ep);

  return (
    /* WatchPage.js */
    <div className="bg-backGround max-w-screen-xl mx-auto py-2 md:px-2">
      <div className="flex flex-col gap-2">
        {ep && id && (
          <Player id={id} episodeId={`${id}?ep=${ep}`} currentEp={currentEp} />
        )}
        <div className="input w-full mt-2 flex items-end justify-end gap-3 text-end">
          <div className="btns bg-card flex mx-2 rounded-child">
            <button
              className={`row item p-2 ${
                layout === "row" ? "bg-primary text-black" : undefined
              }`}
              onClick={() => setLayout("row")}
            >
              <MdTableRows size={"20px"} />
            </button>
            <button
              className={`column item p-2 ${
                layout === "column" ? "bg-primary text-black" : undefined
              }`}
              onClick={() => setLayout("column")}
            >
              <HiMiniViewColumns size={"20px"} />
            </button>
          </div>
        </div>
        <ul
          className={`episodes max-h-[50vh] pb-4 overflow-scroll bg-lightBg grid gap-1  md:gap-2 ${
            layout === "row"
              ? " grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : " grid-cols-5 md:grid-cols-10"
          }`}
        >
          {episodes?.map((episode) => (
            <Episodes
              key={episode.id}
              episode={episode}
              currentEp={currentEp}
              layout={layout}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WatchPage;
