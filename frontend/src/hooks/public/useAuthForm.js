import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getGoogleLoginUrl,
  getAuthErrorMessage,
  login,
  register,
} from "../../services/authApi.js";
import { useAuthSession } from "./useAuthSession.js";

const defaultValues = {
  login: {
    email: "",
    password: "",
  },
  register: {
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
  },
};

function useAuthForm(mode) {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeLogin } = useAuthSession();
  const [values, setValues] = useState(defaultValues[mode]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const isRegister = mode === "register";

  const googleButtonText = useMemo(
    () => `${isRegister ? "Daftar" : "Masuk"} dengan Google`,
    [isRegister],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSuccessMessage("");
    setError("");

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSuccess = (authData) => {
    completeLogin(authData);
    navigate(location.state?.from?.pathname ?? "/", { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (isRegister && values.password !== values.confirmPassword) {
      setError("Konfirmasi kata sandi tidak sama");
      return;
    }

    setIsSubmitting(true);

    try {
      const authData = isRegister
        ? await register({
            email: values.email,
            name: values.name,
            password: values.password,
          })
        : await login({
            email: values.email,
            password: values.password,
          });

      if (isRegister && authData?.requiresEmailVerification) {
        setValues(defaultValues.register);
        setSuccessMessage(
          "Pendaftaran berhasil. Kami telah mengirim tautan verifikasi ke email Anda.",
        );
        return;
      }

      handleSuccess(authData);
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccessMessage("");
    setIsGoogleSubmitting(true);
    window.location.assign(getGoogleLoginUrl());
  };

  return {
    error,
    googleButtonText,
    isGoogleSubmitting,
    isSubmitting,
    onChange: handleChange,
    onGoogleLogin: handleGoogleLogin,
    onSubmit: handleSubmit,
    successMessage,
    values,
  };
}

export default useAuthForm;
