import { useEffect, useState } from "react";
import { getCurrentSubscription } from "../../services/accountApi.js";
import { isSubscriptionActive } from "../../utils/subscription.js";

function useCurrentSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isActive = true;

    getCurrentSubscription()
      .then((currentSubscription) => {
        if (!isActive) {
          return;
        }

        setSubscription(currentSubscription);
        setStatus("succeeded");
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        setSubscription(null);
        setStatus("failed");
      });

    return () => {
      isActive = false;
    };
  }, []);

  return {
    isSubscribed: isSubscriptionActive(subscription),
    status,
    subscription,
  };
}

export default useCurrentSubscription;
