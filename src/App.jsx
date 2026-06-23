import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/public/layout/LoadingScreen.jsx";
import { heroMovie } from "./data/movies.js";
import ManageMovies from "./pages/admin/ManageMovies.jsx";
import Home from "./pages/public/Home.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";

const initialLoadingDuration = 1600;

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, initialLoadingDuration);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <BrowserRouter>
      {isInitialLoading ? <LoadingScreen /> : null}
      <Routes>
        <Route
          path="/"
          element={<Home heroMovie={heroMovie} />}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/movies" element={<ManageMovies />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
