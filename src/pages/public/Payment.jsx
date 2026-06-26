import PaymentContent from "../../components/public/payment/PaymentContent.jsx";
import usePaymentPage from "../../hooks/public/usePaymentPage.js";

function Payment() {
  const { adminFee, formatRupiah, selectedPlan, totalPayment } =
    usePaymentPage();

  return (
    <PaymentContent
      adminFee={adminFee}
      formatRupiah={formatRupiah}
      plan={selectedPlan}
      totalPayment={totalPayment}
    />
  );
}

export default Payment;
