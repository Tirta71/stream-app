import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AuthSessionProvider from "./components/public/auth/AuthSessionProvider.jsx";
import GuestRoute from "./components/public/auth/GuestRoute.jsx";
import ProtectedRoute from "./components/public/auth/ProtectedRoute.jsx";
import LoadingScreen from "./components/public/layout/LoadingScreen.jsx";
import { heroMovie } from "./data/movies.js";
import ManageMovies from "./pages/admin/ManageMovies.jsx";
import GoogleAuthCallback from "./pages/public/GoogleAuthCallback.jsx";
import Home from "./pages/public/Home.jsx";
import Login from "./pages/public/Login.jsx";
import Movie from "./pages/public/Movie.jsx";
import MyList from "./pages/public/MyList.jsx";
import Payment from "./pages/public/Payment.jsx";
import PaymentPending from "./pages/public/PaymentPending.jsx";
import Profile from "./pages/public/Profile.jsx";
import Register from "./pages/public/Register.jsx";
import Series from "./pages/public/Series.jsx";
import Subscription from "./pages/public/Subscription.jsx";

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
        element={
          <ProtectedRoute>
            <Home heroMovie={heroMovie} />
          </ProtectedRoute>
        }
      />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="/film"
        element={
          <ProtectedRoute>
            <Movie />
          </ProtectedRoute>
        }
      />
      <Route path="/movie" element={<Navigate to="/film" replace />} />
      <Route
        path="/series"
        element={
          <ProtectedRoute>
            <Series />
          </ProtectedRoute>
        }
      />
      <Route
        path="/daftar-saya"
        element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/langganan"
        element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pembayaran"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pembayaran/menunggu"
        element={
          <ProtectedRoute>
            <PaymentPending />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
      <Route
        path="/admin/movies"
        element={
          <ProtectedRoute>
            <ManageMovies />
          </ProtectedRoute>
        }
      />
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
      <AuthSessionProvider>
        <ScrollToTop />
        {isInitialLoading ? <LoadingScreen /> : null}
        <AppRoutes />
      </AuthSessionProvider>
    </BrowserRouter>
  );
}

export default App;
