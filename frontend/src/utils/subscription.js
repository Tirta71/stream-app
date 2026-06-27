function isSubscriptionActive(subscription) {
  if (!subscription) {
    return false;
  }

  const status = (subscription.status ?? "").toString().toLowerCase();
  const endedAt = subscription.endedAt ?? subscription.ended_at;
  const endedDate = endedAt ? new Date(endedAt) : null;
  const isDateActive = endedDate
    ? !Number.isNaN(endedDate.getTime()) && endedDate >= new Date()
    : true;

  return status === "active" && isDateActive;
}

export { isSubscriptionActive };
