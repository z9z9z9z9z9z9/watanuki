import { useState } from "react";
import logo from "../assets/logo.png";
import { FaAlignJustify, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  console.log(value);

  const changeInput = (e) => {
    console.log(e.target.value);
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
            <div className="menu">
              <h1 className="cursor-pointer">
                <FaAlignJustify size={25} />
              </h1>
            </div>
            <Link to="/" className="logo cursor-pointer">
              <img className="h-8 md:h-10 w-auto" src={logo} alt="" />
            </Link>
          </div>
          <div className="right justify-end basis-[70%] flex gap-2 md:gap-5 items-center">
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
              <button type="submit" className="absolute right-3 text-black">
                <FaSearch />
              </button>
            </form>
            <button
              className="md:hidden block"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              {showSearchBar ? <FaXmark /> : <FaSearch />}
            </button>
            <button type="submit" className="bg-primary px-5 py-1 rounded-md">
              login
            </button>
          </div>
        </div>
        <form
          action={`/search?keyword=${value}`}
          onSubmit={handleSubmit}
          className={`search mt-5 relative items-center w-full ${
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
