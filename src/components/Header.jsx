import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import Logo from "./Logo";
import useSidebarStore from "../store/sidebarStore";

const Header = () => {
  const sidebarHandler = useSidebarStore((state) => state.toggleSidebar);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const changeInput = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${value}`);
    setValue("");
    setShowSearchBar(false);
  };
  return (
    <div className="relative z-10 w-full">
      <div className="absolute w-full px-4 py-1">
        <div className="flex gap-2 md:gap-5 justify-between items-center">
          <div className="left flex gap-2 md:gap-5 items-center">
            <div className="menu" onClick={sidebarHandler}>
              <h1 className="cursor-pointer">
                <FaBars size={20} />
              </h1>
            </div>
            <Link to="/" className="logo  cursor-pointer">
              <Logo />
            </Link>
          </div>
          <div className="right justify-end lg:basis-[40%] flex gap-2 md:gap-5 items-center">
            <form
              action={`/search?keyword=${value}`}
              onSubmit={handleSubmit}
              className="search md:flex hidden relative justify-end  items-center w-full"
            >
              <input
                value={value}
                onChange={changeInput}
                placeholder="search anime"
                type="text"
                className="header-search w-full px-1 bg-[#FBF8EF]  text-black py-1 rounded-sm"
              />
              <button type="submit" className="absolute right-3">
                <FaSearch color="black" className="text-black" />
              </button>
            </form>
            <button
              className="md:hidden block"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              {showSearchBar ? <FaXmark /> : <FaSearch />}
            </button>
            <button
              type="submit"
              className="bg-primary text-black px-5 py-1 rounded-sm"
            >
              login
            </button>
          </div>
        </div>
        <form
          action={`/search?keyword=${value}`}
          onSubmit={handleSubmit}
          className={`search mt-2 relative items-center w-full ${
            showSearchBar ? "flex" : "hidden"
          }`}
        >
          <input
            value={value}
            onChange={changeInput}
            placeholder="search anime"
            type="text"
            className="header-search w-full px-1 bg-[#FBF8EF]   text-black py-1 rounded-sm"
          />
          <button type="submit" className="absolute right-3  text-black">
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
