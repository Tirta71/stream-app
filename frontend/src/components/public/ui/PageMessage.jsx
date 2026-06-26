const variantClassNames = {
  danger: "border-[#ff7775]/30 bg-[#b71f1d]/15 text-[#ffb1af]",
  default: "border-white/10 bg-white/[0.03] text-[#c1c2c4]",
  empty: "border-dashed border-white/15 bg-white/[0.03] text-[#c1c2c4]",
};

function PageMessage({
  children,
  className = "",
  message,
  variant = "default",
}) {
  const variantClassName =
    variantClassNames[variant] || variantClassNames.default;

  return (
    <div
      className={[
        "rounded-xl border px-6 py-10 text-center text-sm font-medium",
        variantClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {message || children}
    </div>
  );
}

export default PageMessage;
