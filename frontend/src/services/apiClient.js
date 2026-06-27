import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

const apiClient = axios.create({
  baseURL: apiBaseUrl.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function getApiData(responseData) {
  return responseData?.data ?? responseData;
}

function getApiErrorMessage(error, fallbackMessage = "Request gagal") {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      `${fallbackMessage} (${error.response?.status ?? "network"})`
    );
  }

  return error instanceof Error ? error.message : fallbackMessage;
}

async function requestApi(config, fallbackMessage) {
  try {
    const response = await apiClient(config);

    return getApiData(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, fallbackMessage), {
      cause: error,
    });
  }
}

export { apiBaseUrl, apiClient, getApiErrorMessage, requestApi };
