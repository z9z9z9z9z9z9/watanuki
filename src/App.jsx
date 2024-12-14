import {
  Routes,
  Route,
  useLocation,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useSidebarStore from "./store/sidebarStore";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const togglesidebar = useSidebarStore((state) => state.toggleSidebar);
  const location = useLocation();
  const path = location.pathname === "/";

  return (
    <>
      {!path && <Sidebar />}

      <main className={`${isSidebarOpen ? "bg-active" : ""}`}>
        <div
          onClick={togglesidebar}
          className={`${isSidebarOpen ? "active" : ""}`}
        ></div>
        {!path && <Header />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/home" element={<Home />} />
          <Route path="/anime/:id" element={<DetailPage />} />
          <Route path="animes/:category/:query?" element={<ListPage />} />
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
