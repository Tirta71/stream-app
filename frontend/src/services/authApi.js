import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

const authApi = axios.create({
  baseURL: apiBaseUrl.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function getAuthErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      `Request gagal (${error.response?.status ?? "network"})`
    );
  }

  return error instanceof Error ? error.message : "Terjadi kesalahan";
}

async function login(payload) {
  const response = await authApi.post("/auth/login", payload);

  return response.data.data;
}

async function register(payload) {
  const response = await authApi.post("/auth/register", payload);

  return response.data.data;
}

async function loginWithGoogle(payload) {
  const response = await authApi.post("/auth/google", payload);

  return response.data.data;
}

async function getCurrentUser() {
  const response = await authApi.get("/auth/me");

  return response.data.data;
}

async function logout() {
  const response = await authApi.post("/auth/logout");

  return response.data;
}

function getGoogleLoginUrl() {
  return `${authApi.defaults.baseURL}/auth/google`;
}

export {
  authApi,
  getAuthErrorMessage,
  getGoogleLoginUrl,
  getCurrentUser,
  login,
  loginWithGoogle,
  logout,
  register,
};
