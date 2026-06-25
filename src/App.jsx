import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoadingScreen from "./components/public/layout/LoadingScreen.jsx";
import { heroMovie } from "./data/movies.js";
import ManageMovies from "./pages/admin/ManageMovies.jsx";
import Home from "./pages/public/Home.jsx";
import Login from "./pages/public/Login.jsx";
import Movie from "./pages/public/Movie.jsx";
import MyList from "./pages/public/MyList.jsx";
import Register from "./pages/public/Register.jsx";
import Series from "./pages/public/Series.jsx";

const initialLoadingDuration = 1600;

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home heroMovie={heroMovie} />}
      />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/film" element={<Movie />} />
      <Route path="/movie" element={<Navigate to="/film" replace />} />
      <Route path="/series" element={<Series />} />
      <Route path="/daftar-saya" element={<MyList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/movies" element={<ManageMovies />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

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
      <ScrollToTop />
      {isInitialLoading ? <LoadingScreen /> : null}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
