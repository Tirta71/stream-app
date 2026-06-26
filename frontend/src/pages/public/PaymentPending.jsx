import PaymentPendingContent from "../../components/public/payment/PaymentPendingContent.jsx";
import usePaymentPage from "../../hooks/public/usePaymentPage.js";

function PaymentPending() {
  const { adminFee, formatRupiah, selectedPlan, totalPayment } =
    usePaymentPage();

  return (
    <PaymentPendingContent
      adminFee={adminFee}
      formatRupiah={formatRupiah}
      plan={selectedPlan}
      totalPayment={totalPayment}
    />
  );
}

export default PaymentPending;
