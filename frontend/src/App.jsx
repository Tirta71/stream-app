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
import ManageMovies from "./pages/admin/ManageMovies.jsx";
import GoogleAuthCallback from "./pages/public/auth/GoogleAuthCallback.jsx";
import Login from "./pages/public/auth/Login.jsx";
import Register from "./pages/public/auth/Register.jsx";
import VerifyEmail from "./pages/public/auth/VerifyEmail.jsx";
import Home from "./pages/public/home/Home.jsx";
import Movie from "./pages/public/content/Movie.jsx";
import MyList from "./pages/public/myList/MyList.jsx";
import Payment from "./pages/public/payment/Payment.jsx";
import PaymentPending from "./pages/public/payment/PaymentPending.jsx";
import Profile from "./pages/public/profile/Profile.jsx";
import Series from "./pages/public/content/Series.jsx";
import Subscription from "./pages/public/subscription/Subscription.jsx";
import Watch from "./pages/public/watch/Watch.jsx";

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
            <Home />
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
        path="/watch/:id"
        element={
          <ProtectedRoute>
            <Watch />
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
      <Route path="/auth/verifikasi-email" element={<VerifyEmail />} />
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
