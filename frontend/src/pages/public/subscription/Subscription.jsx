import SubscriptionContent from "../../../components/public/subscription/SubscriptionContent.jsx";
import useCurrentSubscription from "../../../hooks/public/useCurrentSubscription.js";
import useSubscriptionPlans from "../../../hooks/public/useSubscriptionPlans.js";

function Subscription() {
  const { error, isLoading, plans } = useSubscriptionPlans();
  const {
    isSubscribed,
    status: subscriptionStatus,
    subscription,
  } = useCurrentSubscription();
  const activePackageId = isSubscribed
    ? subscription?.packageId ?? subscription?.package?.id
    : null;

  return (
    <SubscriptionContent
      activePackageId={activePackageId}
      error={error}
      isLoading={isLoading}
      plans={plans}
      subscriptionStatus={subscriptionStatus}
    />
  );
}

export default Subscription;
