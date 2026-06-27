import { requestApi } from "./apiClient.js";

const getPackages = () =>
  requestApi(
    {
      method: "GET",
      url: "/packages",
    },
    "Gagal mengambil paket langganan",
  );

const createOrder = (packageId) =>
  requestApi(
    {
      data: { packageId },
      method: "POST",
      url: "/orders",
    },
    "Gagal membuat order",
  );

const getOrder = (orderId) =>
  requestApi(
    {
      method: "GET",
      url: `/orders/${orderId}`,
    },
    "Gagal mengambil order",
  );

const createPayment = ({ orderId, paymentGateway, paymentMethod }) =>
  requestApi(
    {
      data: {
        orderId,
        paymentGateway,
        paymentMethod,
      },
      method: "POST",
      url: "/payments",
    },
    "Gagal membuat pembayaran",
  );

const markPaymentAsPaid = (paymentId) =>
  requestApi(
    {
      method: "PATCH",
      url: `/payments/${paymentId}/paid`,
    },
    "Gagal mengkonfirmasi pembayaran",
  );

const getCurrentSubscription = () =>
  requestApi(
    {
      method: "GET",
      url: "/subscriptions/current",
    },
    "Gagal mengambil subscription",
  );

const getProfile = () =>
  requestApi(
    {
      method: "GET",
      url: "/users/me",
    },
    "Gagal mengambil profil",
  );

const updateProfile = (profile) =>
  requestApi(
    {
      data: profile,
      method: "PATCH",
      url: "/users/me",
    },
    "Gagal memperbarui profil",
  );

const uploadProfilePhoto = (photo) => {
  const formData = new FormData();

  formData.append("photo", photo);

  return requestApi(
    {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      url: "/upload",
    },
    "Gagal mengupload foto profil",
  );
};

const getMyList = () =>
  requestApi(
    {
      method: "GET",
      url: "/my-lists",
    },
    "Gagal mengambil daftar saya",
  );

const addMyList = (seriesFilmId) =>
  requestApi(
    {
      data: { seriesFilmId },
      method: "POST",
      url: "/my-lists",
    },
    "Gagal menambahkan daftar saya",
  );

const removeMyList = (seriesFilmId) =>
  requestApi(
    {
      method: "DELETE",
      url: `/my-lists/${seriesFilmId}`,
    },
    "Gagal menghapus daftar saya",
  );

export {
  addMyList,
  createOrder,
  createPayment,
  getCurrentSubscription,
  getMyList,
  getOrder,
  getPackages,
  getProfile,
  markPaymentAsPaid,
  removeMyList,
  updateProfile,
  uploadProfilePhoto,
};
