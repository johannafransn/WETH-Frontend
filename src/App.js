import { Route, Routes } from "react-router-dom";

import { isMobile } from "react-device-detect";

import HomeWrap from "./pages/HomeWrap";
import Wrap from "./pages/Wrap";

import About from "./pages/About";
import MobileDetected from "./pages/MobileDetected";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      {isMobile ? "" : <Navbar />}
      <main>
        {isMobile ? (
          <MobileDetected />
        ) : (
          <Routes>
            <Route path="/" element={<HomeWrap />} />
            <Route path="/wrap" element={<Wrap />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<MobileDetected />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
