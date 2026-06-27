function MyListIcon({ className = "size-[29px]", isSaved = false }) {
  const iconClassName =
    "absolute inset-0 h-full w-full fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] transition-[opacity,transform] duration-200 ease-out";

  return (
    <span className={["relative grid shrink-0 place-items-center", className].join(" ")}>
      <svg
        aria-hidden="true"
        className={[
          iconClassName,
          isSaved ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
        ].join(" ")}
        viewBox="0 0 24 24"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
      <svg
        aria-hidden="true"
        className={[
          iconClassName,
          isSaved ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
        ].join(" ")}
        viewBox="0 0 24 24"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    </span>
  );
}

export default MyListIcon;
