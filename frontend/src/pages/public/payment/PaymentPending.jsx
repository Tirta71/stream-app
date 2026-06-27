import PaymentPendingContent from "../../../components/public/payment/PaymentPendingContent.jsx";
import usePaymentPage from "../../../hooks/public/usePaymentPage.js";

function PaymentPending() {
  const {
    adminFee,
    confirmPayment,
    error,
    formatRupiah,
    isLoading,
    isSubmitting,
    order,
    payment,
    selectedPlan,
    totalPayment,
  } = usePaymentPage();

  return (
    <PaymentPendingContent
      adminFee={adminFee}
      error={error}
      formatRupiah={formatRupiah}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onConfirmPayment={confirmPayment}
      order={order}
      payment={payment}
      plan={selectedPlan}
      totalPayment={totalPayment}
    />
  );
}

export default PaymentPending;
