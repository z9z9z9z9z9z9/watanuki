import useGenresStore from "../store/genresStore";

const Genres = () => {
  const genres = useGenresStore((state) => state.genres);

  const colors = [
    "#ECB159",
    "#92C7CF",
    "#d0e6a5",
    "#ffbade",
    "#fc887b",
    "#ccabda",
    "#abccd8",
    "#d8b2ab",
    "#86e3ce",
  ];

  return (
    <ul className="flex flex-wrap">
      {genres.map((genre, index) => (
        <li
          style={{ color: colors[index % colors.length] }}
          className={`w-1/2 my-2 pl-2 `}
          key={genre}
        >
          {genre}
        </li>
      ))}
    </ul>
  );
};

export default Genres;
