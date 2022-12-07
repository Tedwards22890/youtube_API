// General Imports
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [currentVideo, setCurrentVideo] = useState(null)


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
            <PrivateRoute>
              <HomePage setCurrentVideo={setCurrentVideo}/>
            </PrivateRoute>
        } />
        <Route path="/videos/:vidId/" element={
          <PrivateRoute>
            <VideoPlayer currentVideo={currentVideo} />
          </PrivateRoute>
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;