import SubscriptionContent from "../../../components/public/subscription/SubscriptionContent.jsx";
import useSubscriptionPlans from "../../../hooks/public/useSubscriptionPlans.js";

function Subscription() {
  const { error, isLoading, plans } = useSubscriptionPlans();

  return (
    <SubscriptionContent error={error} isLoading={isLoading} plans={plans} />
  );
}

export default Subscription;
