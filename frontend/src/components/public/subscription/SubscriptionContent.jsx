import Footer from "../layout/Footer.jsx";
import Navbar from "../layout/Navbar.jsx";
import PageMessage from "../ui/PageMessage.jsx";
import PageTransition from "../ui/PageTransition.jsx";
import SubscriptionPackageCard from "./SubscriptionPackageCard.jsx";

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 fill-current max-[640px]:h-8 max-[640px]:w-8"
      viewBox="0 0 48 48"
    >
      <path d="M20 6h8v18h8L24 36 12 24h8V6Zm-8 32h24v4H12v-4Z" />
    </svg>
  );
}

function NoAdsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 fill-current max-[640px]:h-8 max-[640px]:w-8"
      viewBox="0 0 48 48"
    >
      <path d="M7 7.8 9.8 5 43 38.2 40.2 41l-7-7H31l-2.2-7h-9.2L17.4 34h-5.2l5.4-15.8L7 7.8Zm15.1 14.9H27l-2.4-7.8-2.5 7.8ZM12 14.8V34H7V9.8l5 5Zm23 15.4V14h-6.1l-1.3-4H45v4h-5v20.2l-5-5ZM21.6 9h5.8l6 18.2-6.1-6.1L24.6 13l-1.3 4-3.8-3.8L21.6 9Z" />
    </svg>
  );
}

function FilmIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 fill-current max-[640px]:h-8 max-[640px]:w-8"
      viewBox="0 0 48 48"
    >
      <path d="M24 5a19 19 0 1 0 0 38 19 19 0 0 0 0-38Zm0 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 14a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-11-3a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm14 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 fill-current max-[640px]:h-8 max-[640px]:w-8"
      viewBox="0 0 48 48"
    >
      <path d="M12 11h24a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4Zm3 10v4h4v6h4V17h-4v4h-4Zm11-4v14h4v-5.3l4.2 5.3H39l-5.7-7 5.2-7H34l-4 5.4V17h-4Z" />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 fill-current max-[640px]:h-8 max-[640px]:w-8"
      viewBox="0 0 48 48"
    >
      <path d="M7 11h27a4 4 0 0 1 4 4v14h-5V16H12v16h17v5H7V11Zm27 21h8v-9h-8v9Zm-2-13h12a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H32a2 2 0 0 1-2-2V21a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function SubtitleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 fill-current max-[640px]:h-8 max-[640px]:w-8"
      viewBox="0 0 48 48"
    >
      <path d="M8 10h32a4 4 0 0 1 4 4v25l-8-7H8V10Zm7 8v4h18v-4H15Zm0 8v4h26v-4H15Z" />
    </svg>
  );
}

const benefits = [
  {
    icon: <DownloadIcon />,
    title: "Download Konten Pilihan",
  },
  {
    icon: <NoAdsIcon />,
    title: "Tidak Ada Iklan",
  },
  {
    icon: <FilmIcon />,
    title: "Tonton Semua Konten",
  },
  {
    icon: <QualityIcon />,
    title: "Kualitas Maksimal Sampai Dengan 4K",
  },
  {
    icon: <DeviceIcon />,
    title: "Tonton di Tv, Tablet, Mobile, dan Laptop",
  },
  {
    icon: <SubtitleIcon />,
    title: "Subtitle Untuk Konten Pilihan",
  },
];

function SubscriptionContent({
  activePackageId,
  error,
  isLoading,
  plans,
  subscriptionStatus,
}) {
  const isCheckingSubscription =
    subscriptionStatus === "idle" || subscriptionStatus === "loading";

  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c]">
        <section className="px-20 pb-[104px] pt-[128px] max-[900px]:px-5 max-[640px]:pb-7 max-[640px]:pt-9">
          <h1 className="m-0 text-center text-[32px] font-bold leading-[1.2] max-[640px]:text-xl">
            Kenapa Harus Berlangganan?
          </h1>

          <div className="mx-auto mt-16 grid max-w-[980px] grid-cols-3 gap-x-[148px] gap-y-11 max-[900px]:gap-x-14 max-[640px]:mt-7 max-[640px]:grid-cols-2 max-[640px]:gap-x-7 max-[640px]:gap-y-5">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="flex min-h-[112px] flex-col items-center justify-start text-center text-white/70 max-[640px]:min-h-[92px]"
              >
                <div className="grid h-12 place-items-center text-white max-[640px]:h-9">
                  {benefit.icon}
                </div>
                <h2 className="m-0 mt-6 text-xl font-bold leading-[1.2] max-[640px]:mt-4 max-[640px]:text-base">
                  {benefit.title}
                </h2>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#202829] px-20 pb-20 pt-11 max-[900px]:px-5 max-[640px]:mx-5 max-[640px]:px-10 max-[640px]:pb-10 max-[640px]:pt-10">
          <h2 className="m-0 text-center text-[32px] font-bold leading-[1.2] max-[640px]:text-xl">
            Pilih Paketmu
          </h2>
          <p className="m-0 mt-3 text-center text-lg leading-[1.4] max-[640px]:mt-2 max-[640px]:text-sm">
            Temukan paket sesuai kebutuhanmu!
          </p>

          {error ? (
            <PageMessage
              className="mx-auto mt-8 max-w-xl"
              message={error}
              variant="danger"
            />
          ) : null}

          {isLoading && !plans.length ? (
            <PageMessage
              className="mx-auto mt-8 max-w-xl"
              message="Memuat paket langganan..."
            />
          ) : (
            <div className="mx-auto mt-10 flex max-w-[936px] justify-between gap-12 max-[900px]:gap-7 max-[760px]:flex-col max-[760px]:items-center max-[640px]:mt-10 max-[640px]:gap-8">
              {plans.map((plan) => (
                <SubscriptionPackageCard
                  key={plan.id}
                  actionLabel={
                    String(plan.packageId) === String(activePackageId)
                      ? "Berlangganan"
                      : "Langganan"
                  }
                  actionTo={`/pembayaran?paket=${plan.id}`}
                  disabled={
                    !isCheckingSubscription &&
                    String(plan.packageId) === String(activePackageId)
                  }
                  plan={plan}
                />
              ))}
            </div>
          )}
        </section>
      </PageTransition>
      <Footer />
    </div>
  );
}

export default SubscriptionContent;
