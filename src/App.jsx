import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useSidebarStore from "./store/sidebarStore";

const App = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const location = useLocation();
  const path = location.pathname === "/";

  return (
    <>
      {!path && <Sidebar />}

      <main className={`${isSidebarOpen ? "bg-active" : ""}`}>
        <div className={`${isSidebarOpen ? "active" : ""}`}></div>
        {!path && <Header />}
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/:home" element={<Home />} />
        </Routes>
      </main>
    </>
  );
};

// pages
// /
// /home
// /:id
// top-rated
// most-popular
// most-favotite
// completed
// recently-added
// recently-updated
// top-upcoming
// subbed-anime
// dubbed-anime
// movie
// tv
// ova
// ona
// special
// events
// /genre/:genre
//  /watch/:id?ep=${number}
//  /character/:id
//  /people/:id
// filter

export default App;
