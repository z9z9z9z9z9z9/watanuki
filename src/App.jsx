import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/:query" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
