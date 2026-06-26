import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/public/auth/AuthLayout.jsx";
import PageMessage from "../../components/public/ui/PageMessage.jsx";
import { useAuthSession } from "../../hooks/public/useAuthSession.js";

function GoogleAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshSession } = useAuthSession();

  const authResult = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const googleError = params.get("error");

    if (googleError) {
      return { error: googleError };
    }

    if (success !== "1") {
      return { error: "Login Google belum berhasil" };
    }

    return { error: "" };
  }, [location.search]);

  useEffect(() => {
    if (authResult.error) {
      return;
    }

    refreshSession().then((user) => {
      if (user) {
        navigate("/", { replace: true });
      }
    });
  }, [authResult, navigate, refreshSession]);

  return (
    <AuthLayout title="Login Google" subtitle="Menghubungkan akun Google">
      <PageMessage
        variant={authResult.error ? "danger" : "default"}
        message={authResult.error || "Mohon tunggu sebentar..."}
      />
      {authResult.error ? (
        <Link
          className="mt-4 inline-flex w-full justify-center rounded-full bg-[#2f3334] px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-[160ms] hover:bg-[#3a4042]"
          to="/login"
        >
          Kembali ke Login
        </Link>
      ) : null}
    </AuthLayout>
  );
}

export default GoogleAuthCallback;
