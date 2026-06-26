function PageTitle({ children, className = "", title }) {
  return (
    <h1
      className={[
        "mb-8 text-[32px] font-bold leading-[1.2] tracking-normal text-white max-[640px]:mb-4 max-[640px]:text-[22px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title || children}
    </h1>
  );
}

export default PageTitle;
