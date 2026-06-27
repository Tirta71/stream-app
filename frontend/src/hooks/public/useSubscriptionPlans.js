import { useEffect, useMemo, useState } from "react";
import { getPackages } from "../../services/accountApi.js";

const adminFee = 3000;

const formatRupiah = (value) =>
  `Rp${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)}`;

function getAccountLabel(maxDevices) {
  const deviceCount = Number(maxDevices) || 1;

  if (deviceCount >= 5) {
    return "5-7 Akun";
  }

  return `${deviceCount} Akun`;
}

function getPaymentLabel(name) {
  return `Paket Premium ${name}`;
}

function mapPackageToPlan(plan) {
  const price = Number(plan?.price) || 0;
  const quality = plan?.quality || "720p";
  const name = plan?.name || "Individual";

  return {
    accountLabel: getAccountLabel(plan?.maxDevices ?? plan?.max_devices),
    durationDays: Number(plan?.durationDays ?? plan?.duration_days) || 30,
    features: [
      "Tidak ada iklan",
      `Kualitas ${quality}`,
      "Download konten pilihan",
    ],
    id: String(plan?.id ?? name).toLowerCase(),
    name,
    packageId: plan?.id,
    paymentLabel: getPaymentLabel(name),
    price,
    priceLabel: `Mulai dari ${formatRupiah(price)}/bulan`,
    quality,
  };
}

function getSubscriptionPlan(plans, planId) {
  if (!plans.length) {
    return null;
  }

  const normalizedPlanId = String(planId ?? "").toLowerCase();

  return (
    plans.find(
      (plan) =>
        String(plan.id).toLowerCase() === normalizedPlanId ||
        plan.name.toLowerCase() === normalizedPlanId,
    ) ?? plans[0]
  );
}

function useSubscriptionPlans(selectedPlanId) {
  const [packages, setPackages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    getPackages()
      .then((items) => {
        if (!isActive) {
          return;
        }

        setPackages(Array.isArray(items) ? items : []);
        setStatus("succeeded");
      })
      .catch((requestError) => {
        if (!isActive) {
          return;
        }

        setPackages([]);
        setStatus("failed");
        setError(requestError.message || "Gagal mengambil paket langganan");
      });

    return () => {
      isActive = false;
    };
  }, []);

  const plans = useMemo(() => packages.map(mapPackageToPlan), [packages]);
  const selectedPlan = useMemo(
    () => getSubscriptionPlan(plans, selectedPlanId),
    [plans, selectedPlanId],
  );

  return {
    adminFee,
    error,
    formatRupiah,
    isLoading: status === "idle" || status === "loading",
    plans,
    selectedPlan,
    status,
    totalPayment: selectedPlan ? selectedPlan.price + adminFee : adminFee,
  };
}

export {
  adminFee,
  formatRupiah,
  getSubscriptionPlan,
  mapPackageToPlan,
};
export default useSubscriptionPlans;
