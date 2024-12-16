import { useRef, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useApi } from "../services/useApi";
import Logo from "./Logo";
import useSidebarStore from "../store/sidebarStore";
import Loader from "./Loader";

const Header = () => {
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(""); // For debouncing
  const timeoutRef = useRef(null);

  const navigate = useNavigate();

  // Debounce input value
  const changeInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(newValue); // Set debounced value after 1 second
    }, 1000);
  };

  // React Query hook with `useApi`
  const { data, isLoading, isError, error } = useApi(
    debouncedValue.length > 2 ? `/suggest?keyword=${debouncedValue}` : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${value}`);
    resetSearch();
  };

  const navigateToAnimePage = (id) => {
    navigate(`/anime/${id}`);
    resetSearch();
  };
  const resetSearch = () => {
    setValue("");
    setDebouncedValue("");
    setShowSearchBar(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  return (
    <div className="relative">
      <div className="z-10 absolute bg-backGround w-full  py-4">
        <div className="flex gap-2 px-5 md:px-10 md:gap-5 justify-between items-center">
          <div className="left flex gap-2 md:gap-5 items-center">
            <div className="menu" onClick={sidebarHandler}>
              <h1 className="cursor-pointer">
                <FaBars size={25} />
              </h1>
            </div>
            <Logo />
          </div>
          <div className="right justify-end lg:basis-[40%] flex gap-2 md:gap-5 items-center">
            <button
              className="text-xl"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              {showSearchBar ? <FaXmark /> : <FaSearch />}
            </button>
          </div>
        </div>
        <form
          action={`/search?keyword=${value}`}
          onSubmit={handleSubmit}
          className={`search mt-2 px-4 relative items-center w-full ${
            showSearchBar ? "flex" : "hidden"
          }`}
        >
          <input
            value={value}
            onChange={changeInput}
            placeholder="search anime"
            type="text"
            className="header-search w-full bg-[#FBF8EF] px-2 text-lg text-black py-2 rounded-md"
          />
          <button type="submit" className="absolute right-8 text-black">
            <FaSearch />
          </button>
        </form>
        <div className={`${showSearchBar ? "flex flex-col mt-4" : "hidden"}`}>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="text-red-500">{error.message}</p>
          ) : (
            data?.data?.map((item) => (
              <div
                onClick={() => navigateToAnimePage(item.id)}
                className="flex w-full hover:bg-lightBg px-3 py-5 gap-4"
                key={item.id}
              >
                <div className="poster flex-nowrap pb-14 relative w-12">
                  <img
                    className="h-full w-full inset-0 absolute object-cover object-center"
                    src={item.poster}
                    alt={item.title}
                  />
                </div>
                <div className="info">
                  <h4 className="title">{item.title}</h4>
                  <h6 className="gray text-sm">{item.alternativeTitle}</h6>
                  <div className="flex items-center gap-2 text-sm gray">
                    <h6>{item.aired}</h6>
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    <h6>{item.type}</h6>
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    <h6>{item.duration}</h6>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
