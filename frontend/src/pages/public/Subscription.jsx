import SubscriptionContent from "../../components/public/subscription/SubscriptionContent.jsx";
import useSubscriptionPlans from "../../hooks/public/useSubscriptionPlans.js";

function Subscription() {
  const { plans } = useSubscriptionPlans();

  return <SubscriptionContent plans={plans} />;
}

export default Subscription;
