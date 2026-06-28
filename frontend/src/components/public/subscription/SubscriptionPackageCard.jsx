import { Link } from "react-router-dom";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4]"
      viewBox="0 0 24 24"
    >
      <path d="m5 12 4 4 10-10" />
    </svg>
  );
}

function SubscriptionPackageCard({
  actionLabel = "Langganan",
  actionTo,
  className = "",
  disabled = false,
  plan,
}) {
  const actionClassName = [
    "mt-9 flex min-h-[42px] w-full items-center justify-center rounded-full bg-white px-5 text-base font-bold text-[#0f1e93] transition-colors max-[640px]:mt-6 max-[640px]:min-h-9 max-[640px]:text-sm",
    disabled
      ? "cursor-not-allowed opacity-70"
      : "hover:bg-white/90",
  ].join(" ");

  return (
    <article
      className={[
        "flex min-h-[400px] w-[272px] flex-col rounded-[10px] bg-[linear-gradient(135deg,#5574e8_0%,#1727bf_100%)] px-6 py-6 text-white shadow-[0_22px_48px_rgba(0,0,0,0.22)] max-[640px]:min-h-[354px] max-[640px]:w-full max-[640px]:max-w-[280px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="inline-flex min-h-[46px] w-fit items-center justify-center rounded-full bg-[#3d4243] px-5 text-lg font-medium leading-none max-[640px]:min-h-10 max-[640px]:text-base">
        {plan.name}
      </span>

      <div className="mt-7 text-sm leading-[1.45] max-[640px]:mt-6">
        <p className="m-0">{plan.priceLabel}</p>
        <p className="m-0 mt-1">{plan.accountLabel}</p>
      </div>

      <ul className="m-0 mt-7 list-none space-y-3 p-0 text-sm leading-[1.35] max-[640px]:mt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9 max-[640px]:pt-7">
        <div className="h-px w-full bg-white/20" />
        {disabled ? (
          <button
            className={actionClassName}
            disabled
            style={{ color: "#0f1e93" }}
            type="button"
          >
            {actionLabel}
          </button>
        ) : actionTo ? (
          <Link
            className={actionClassName}
            style={{ color: "#0f1e93" }}
            to={actionTo}
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            className={actionClassName}
            style={{ color: "#0f1e93" }}
            type="button"
          >
            {actionLabel}
          </button>
        )}
        <p className="m-0 mt-2 text-center text-xs leading-[1.4]">
          Syarat dan Ketentuan Berlaku
        </p>
      </div>
    </article>
  );
}

export default SubscriptionPackageCard;
