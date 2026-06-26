import { useSearchParams } from "react-router-dom";
import useSubscriptionPlans from "./useSubscriptionPlans.js";

function usePaymentPage() {
  const [searchParams] = useSearchParams();

  return useSubscriptionPlans(searchParams.get("paket"));
}

export default usePaymentPage;
