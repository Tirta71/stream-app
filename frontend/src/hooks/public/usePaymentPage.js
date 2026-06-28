import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createOrder,
  createPayment,
  getOrder,
  syncPaymentStatus,
} from "../../services/accountApi.js";
import { openMidtransPayment } from "../../services/midtransSnap.js";
import useSubscriptionPlans, {
  adminFee,
  formatRupiah,
  mapPackageToPlan,
} from "./useSubscriptionPlans.js";

function getOrderPayment(order) {
  return Array.isArray(order?.payments) ? order.payments[0] : null;
}

function isOrderPaid(order) {
  return (order?.status ?? "").toString().toLowerCase() === "paid";
}

function usePaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlanId = searchParams.get("paket");
  const orderId = searchParams.get("order");
  const paymentId = searchParams.get("payment");
  const midtransReturnKey = [
    searchParams.get("order_id"),
    searchParams.get("status_code"),
    searchParams.get("transaction_status"),
  ]
    .filter(Boolean)
    .join(":");
  const shouldSyncReturnedPayment = Boolean(orderId && midtransReturnKey);
  const plansState = useSubscriptionPlans(selectedPlanId);
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("loading");
  const [orderError, setOrderError] = useState("");
  const [actionStatus, setActionStatus] = useState("idle");
  const [actionError, setActionError] = useState("");
  const lastSyncedReturnRef = useRef("");

  useEffect(() => {
    if (!orderId) {
      return undefined;
    }

    let isActive = true;

    getOrder(orderId)
      .then((item) => {
        if (!isActive) {
          return;
        }

        setOrder(item);
        setOrderStatus("succeeded");
      })
      .catch((requestError) => {
        if (!isActive) {
          return;
        }

        setOrder(null);
        setOrderStatus("failed");
        setOrderError(requestError.message || "Gagal mengambil order");
      });

    return () => {
      isActive = false;
    };
  }, [orderId]);

  const orderPayment = getOrderPayment(order);
  const selectedPlan = useMemo(() => {
    if (order?.package) {
      return mapPackageToPlan(order.package);
    }

    return plansState.selectedPlan;
  }, [order, plansState.selectedPlan]);
  const totalPayment = Number(order?.totalPrice) || plansState.totalPayment;

  const goToWaitingPayment = (targetOrder, targetPayment) => {
    const paymentQuery = targetPayment?.id ? `&payment=${targetPayment.id}` : "";

    navigate(`/pembayaran/menunggu?order=${targetOrder.id}${paymentQuery}`);
  };

  const syncOrderPayment = useCallback(
    async (targetOrderId) => {
      await syncPaymentStatus(targetOrderId);

      const refreshedOrder = await getOrder(targetOrderId);

      setOrder(refreshedOrder);
      setOrderStatus("succeeded");

      return refreshedOrder;
    },
    [],
  );

  const openPayment = async (targetOrder, targetPayment) => {
    await openMidtransPayment(targetPayment, {
      onClose: () => goToWaitingPayment(targetOrder, targetPayment),
      onError: () => goToWaitingPayment(targetOrder, targetPayment),
      onPending: () => goToWaitingPayment(targetOrder, targetPayment),
      onSuccess: () => {
        syncOrderPayment(targetOrder.id).catch(() => {
          goToWaitingPayment(targetOrder, targetPayment);
        });
      },
    });
  };

  useEffect(() => {
    if (!shouldSyncReturnedPayment || orderStatus !== "succeeded") {
      return undefined;
    }

    const syncKey = `${orderId}:${midtransReturnKey}`;

    if (lastSyncedReturnRef.current === syncKey) {
      return undefined;
    }

    lastSyncedReturnRef.current = syncKey;
    let isActive = true;

    setActionStatus("loading");
    setActionError("");

    syncOrderPayment(orderId)
      .then(() => {
        if (isActive) {
          setActionStatus("succeeded");
        }
      })
      .catch((requestError) => {
        if (!isActive) {
          return;
        }

        setActionStatus("failed");
        setActionError(
          requestError.message || "Gagal menyinkronkan pembayaran",
        );
      });

    return () => {
      isActive = false;
    };
  }, [
    midtransReturnKey,
    orderId,
    orderStatus,
    shouldSyncReturnedPayment,
    syncOrderPayment,
  ]);

  const startPayment = async (paymentMethod = "bca_va") => {
    if (!selectedPlan?.packageId) {
      setActionError("Paket langganan belum tersedia");
      return;
    }

    setActionStatus("loading");
    setActionError("");

    try {
      const createdOrder = await createOrder(selectedPlan.packageId);
      const createdPayment = await createPayment({
        orderId: createdOrder.id,
        paymentGateway: "midtrans",
        paymentMethod,
      });

      goToWaitingPayment(createdOrder, createdPayment);
    } catch (requestError) {
      setActionStatus("failed");
      setActionError(requestError.message || "Gagal membuat pembayaran");
      return;
    }

    setActionStatus("succeeded");
  };

  const confirmPayment = async () => {
    const targetPayment = orderPayment;
    if (isOrderPaid(order)) {
      navigate("/profil");
      return;
    }

    if (!order || !targetPayment) {
      setActionError("Payment belum tersedia");
      return;
    }

    setActionStatus("loading");
    setActionError("");

    try {
      await openPayment(order, targetPayment);
    } catch (requestError) {
      setActionStatus("failed");
      setActionError(requestError.message || "Gagal membuka pembayaran");
      return;
    }

    setActionStatus("succeeded");
  };

  return {
    adminFee,
    error: orderError || plansState.error || actionError,
    formatRupiah,
    isLoading:
      plansState.isLoading || (orderId ? orderStatus === "loading" : false),
    isSubmitting: actionStatus === "loading",
    order,
    payment: orderPayment,
    paymentId,
    selectedPlan,
    startPayment,
    status: orderError || plansState.error ? "failed" : "succeeded",
    totalPayment,
    confirmPayment,
  };
}

export default usePaymentPage;
