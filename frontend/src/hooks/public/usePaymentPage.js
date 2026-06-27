import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createOrder,
  createPayment,
  getOrder,
  markPaymentAsPaid,
} from "../../services/accountApi.js";
import useSubscriptionPlans, {
  adminFee,
  formatRupiah,
  mapPackageToPlan,
} from "./useSubscriptionPlans.js";

function getOrderPayment(order) {
  return Array.isArray(order?.payments) ? order.payments[0] : null;
}

function usePaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlanId = searchParams.get("paket");
  const orderId = searchParams.get("order");
  const paymentId = searchParams.get("payment");
  const plansState = useSubscriptionPlans(selectedPlanId);
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("loading");
  const [orderError, setOrderError] = useState("");
  const [actionStatus, setActionStatus] = useState("idle");
  const [actionError, setActionError] = useState("");

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

  const startPayment = async (paymentMethod = "BCA Virtual Account") => {
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
        paymentGateway: "BCA",
        paymentMethod,
      });

      navigate(
        `/pembayaran/menunggu?order=${createdOrder.id}&payment=${createdPayment.id}`,
      );
    } catch (requestError) {
      setActionStatus("failed");
      setActionError(requestError.message || "Gagal membuat pembayaran");
      return;
    }

    setActionStatus("succeeded");
  };

  const confirmPayment = async () => {
    const targetPaymentId = paymentId ?? orderPayment?.id;

    if (!targetPaymentId) {
      setActionError("Payment belum tersedia");
      return;
    }

    setActionStatus("loading");
    setActionError("");

    try {
      await markPaymentAsPaid(targetPaymentId);
      navigate("/profil");
    } catch (requestError) {
      setActionStatus("failed");
      setActionError(requestError.message || "Gagal mengkonfirmasi pembayaran");
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
    selectedPlan,
    startPayment,
    status: orderError || plansState.error ? "failed" : "succeeded",
    totalPayment,
    confirmPayment,
  };
}

export default usePaymentPage;
