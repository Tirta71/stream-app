import PaymentContent from "../../../components/public/payment/PaymentContent.jsx";
import usePaymentPage from "../../../hooks/public/usePaymentPage.js";

function Payment() {
  const {
    adminFee,
    error,
    formatRupiah,
    isLoading,
    isSubmitting,
    selectedPlan,
    startPayment,
    totalPayment,
  } = usePaymentPage();

  return (
    <PaymentContent
      adminFee={adminFee}
      error={error}
      formatRupiah={formatRupiah}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onPay={startPayment}
      plan={selectedPlan}
      totalPayment={totalPayment}
    />
  );
}

export default Payment;
