import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthLayout from "../../../components/public/auth/AuthLayout.jsx";
import Button from "../../../components/public/ui/Button.jsx";
import FormInput from "../../../components/public/ui/FormInput.jsx";
import PageMessage from "../../../components/public/ui/PageMessage.jsx";
import { useAuthSession } from "../../../hooks/public/useAuthSession.js";
import {
  getAuthErrorMessage,
  resendVerification,
  verifyEmail,
} from "../../../services/authApi.js";

const verificationRequests = new Map();
const verifiedTokens = new Set();

const verifyTokenOnce = (token) => {
  if (verifiedTokens.has(token)) {
    return Promise.resolve();
  }

  if (!verificationRequests.has(token)) {
    const request = verifyEmail(token)
      .then((data) => {
        verifiedTokens.add(token);

        return data;
      })
      .finally(() => {
        verificationRequests.delete(token);
      });

    verificationRequests.set(token, request);
  }

  return verificationRequests.get(token);
};

function VerifyEmail() {
  const location = useLocation();
  const { completeLogin } = useAuthSession();
  const token = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return params.get("token") ?? "";
  }, [location.search]);
  const [status, setStatus] = useState(token ? "loading" : "idle");
  const [message, setMessage] = useState(
    token
      ? "Kami sedang memverifikasi email Anda. Mohon tunggu sebentar."
      : "Masukkan email akun Anda untuk menerima tautan verifikasi baru.",
  );
  const [email, setEmail] = useState("");
  const [resendStatus, setResendStatus] = useState("idle");
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    verifyTokenOnce(token)
      .then((authData) => {
        if (!isMounted) {
          return;
        }

        completeLogin(authData);
        setStatus("success");
        setMessage(
          "Email berhasil diverifikasi. Silakan masuk untuk mulai menggunakan CHILL.",
        );
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setMessage(getAuthErrorMessage(error));
      });

    return () => {
      isMounted = false;
    };
  }, [completeLogin, token]);

  const handleResendSubmit = async (event) => {
    event.preventDefault();
    setResendStatus("loading");
    setResendMessage("");

    try {
      const result = await resendVerification({ email });

      setResendStatus("success");
      setResendMessage(
        result.message ||
          "Tautan verifikasi baru telah dikirim. Silakan periksa email Anda.",
      );
    } catch (error) {
      setResendStatus("error");
      setResendMessage(getAuthErrorMessage(error));
    }
  };

  const isVerifying = status === "loading";
  const isVerified = status === "success";
  const isResending = resendStatus === "loading";

  return (
    <AuthLayout
      title="Verifikasi Email"
      subtitle="Aktifkan akun Anda untuk melanjutkan"
    >
      <div className="flex flex-col gap-5">
        <PageMessage
          className="py-6 text-left leading-relaxed"
          variant={status === "error" ? "danger" : "default"}
        >
          <span className="block text-base font-semibold text-white">
            {isVerified
              ? "Verifikasi berhasil"
              : isVerifying
                ? "Sedang memproses"
                : "Verifikasi diperlukan"}
          </span>
          <span className="mt-2 block text-sm font-medium text-[rgba(255,255,255,0.76)]">
            {message}
          </span>
        </PageMessage>

        {isVerified ? (
          <Link
            className="inline-flex w-full justify-center rounded-full bg-[#2f3334] px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-[160ms] hover:bg-[#3a4042]"
            to="/"
          >
            Masuk
          </Link>
        ) : null}

        {!isVerifying && !isVerified ? (
          <form
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            onSubmit={handleResendSubmit}
          >
            <div className="mb-4">
              <h2 className="mb-1 text-base font-semibold text-white">
                Belum menerima email?
              </h2>
              <p className="m-0 text-sm leading-relaxed text-[rgba(255,255,255,0.68)]">
                Kirim ulang tautan verifikasi. Tautan hanya berlaku dalam waktu
                terbatas dan akun yang tidak diverifikasi akan dihapus setelah
                kedaluwarsa.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <FormInput
                autoComplete="email"
                label="Email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukkan email akun"
                required
                type="email"
                value={email}
              />

              {resendMessage ? (
                <div
                  className={[
                    "rounded-xl border px-4 py-3 text-sm font-semibold",
                    resendStatus === "error"
                      ? "border-[#ff7775]/30 bg-[#b71f1d]/20 text-[#ffb1af]"
                      : "border-[#4dd889]/30 bg-[#0e7a3c]/20 text-[#a7f3c6]",
                  ].join(" ")}
                >
                  {resendMessage}
                </div>
              ) : null}

              <Button type="submit" disabled={isResending}>
                {isResending ? "Mengirim..." : "Kirim Ulang Verifikasi"}
              </Button>
            </div>
          </form>
        ) : null}
      </div>
    </AuthLayout>
  );
}

export default VerifyEmail;
