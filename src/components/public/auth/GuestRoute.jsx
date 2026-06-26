import { Navigate } from "react-router-dom";
import PageMessage from "../ui/PageMessage.jsx";
import { useAuthSession } from "../../../hooks/public/useAuthSession.js";

function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#181a1c] px-5 text-white">
        <PageMessage message="Memeriksa sesi login..." />
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;
