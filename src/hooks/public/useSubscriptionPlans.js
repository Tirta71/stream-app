const adminFee = 3000;

const subscriptionPlans = [
  {
    accountLabel: "1 Akun",
    features: ["Tidak ada iklan", "Kualitas 720p", "Download konten pilihan"],
    id: "individual",
    name: "Individual",
    paymentLabel: "Paket Premium Individual",
    price: 49000,
    priceLabel: "Mulai dari Rp49,990/bulan",
  },
  {
    accountLabel: "2 Akun",
    features: ["Tidak ada iklan", "Kualitas 1080p", "Download konten pilihan"],
    id: "berdua",
    name: "Berdua",
    paymentLabel: "Paket Premium Berdua",
    price: 79000,
    priceLabel: "Mulai dari Rp79,990/bulan",
  },
  {
    accountLabel: "5-7 Akun",
    features: ["Tidak ada iklan", "Kualitas 4K", "Download konten pilihan"],
    id: "keluarga",
    name: "Keluarga",
    paymentLabel: "Paket Premium Keluarga",
    price: 159000,
    priceLabel: "Mulai dari Rp159,990/bulan",
  },
];

const formatRupiah = (value) =>
  `Rp${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value)}`;

const getSubscriptionPlan = (planId) =>
  subscriptionPlans.find((plan) => plan.id === planId) ?? subscriptionPlans[0];

function useSubscriptionPlans(selectedPlanId) {
  const selectedPlan = getSubscriptionPlan(selectedPlanId);

  return {
    adminFee,
    formatRupiah,
    plans: subscriptionPlans,
    selectedPlan,
    totalPayment: selectedPlan.price + adminFee,
  };
}

export { formatRupiah, getSubscriptionPlan, subscriptionPlans };
export default useSubscriptionPlans;
