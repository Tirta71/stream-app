import { useState } from "react";
import Footer from "../layout/Footer.jsx";
import Navbar from "../layout/Navbar.jsx";
import SubscriptionPackageCard from "../subscription/SubscriptionPackageCard.jsx";
import PageMessage from "../ui/PageMessage.jsx";
import PageTransition from "../ui/PageTransition.jsx";

function RadioMark({ selected = false }) {
  return (
    <span
      className={[
        "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
        selected ? "border-white" : "border-[#8f96b2]",
      ].join(" ")}
      aria-hidden="true"
    >
      {selected ? <span className="h-2.5 w-2.5 rounded-full bg-white" /> : null}
    </span>
  );
}

function CardBrandIcons() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-black text-[#12398d]">
        VISA
      </span>
      <span className="relative h-5 w-8 rounded bg-[#252525]">
        <span className="absolute left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#eb001b]" />
        <span className="absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#f79e1b]" />
      </span>
      <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-black text-[#1b7b42]">
        JCB
      </span>
      <span className="rounded bg-[#1e95d3] px-1.5 py-0.5 text-[9px] font-black text-white">
        AMEX
      </span>
    </span>
  );
}

function BcaIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e9bd7] text-[8px] font-black text-white"
    >
      BCA
    </span>
  );
}

const paymentMethods = [
  {
    icon: <CardBrandIcons />,
    id: "credit_card",
    label: "Kartu Debit/Kredit",
  },
  {
    icon: <BcaIcon />,
    id: "bca_va",
    label: "BCA Virtual Account",
  },
];

function PaymentMethodOption({
  children,
  disabled = false,
  onClick,
  selected = false,
}) {
  return (
    <button
      className={[
        "flex min-h-12 items-center gap-3 rounded border px-3 text-left text-base text-white transition-colors max-[640px]:min-h-[48px] max-[640px]:text-sm",
        selected
          ? "border-white bg-white/[0.08]"
          : "border-white/55 hover:border-white/90 hover:bg-white/[0.04]",
        disabled ? "cursor-default" : "",
      ].join(" ")}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <RadioMark selected={selected} />
      {children}
    </button>
  );
}

function TransactionSummary({ adminFee, formatRupiah, plan, totalPayment }) {
  return (
    <section className="mt-5 max-w-[470px]" aria-labelledby="transaction-title">
      <h2
        id="transaction-title"
        className="m-0 text-lg font-bold leading-[1.4] max-[640px]:text-base"
      >
        Ringkasan Transaksi
      </h2>
      <dl className="m-0 mt-5 grid grid-cols-[1fr_auto] gap-y-2 text-base leading-[1.35] max-[640px]:mt-4 max-[640px]:text-xs">
        <dt className="text-white/70">{plan.paymentLabel}</dt>
        <dd className="m-0 text-white">{formatRupiah(plan.price)}</dd>
        <dt className="text-white/70">Biaya Admin</dt>
        <dd className="m-0 text-white">{formatRupiah(adminFee)}</dd>
        <dt className="pt-1 text-lg text-white/75 max-[640px]:text-base">
          Total Pembayaran
        </dt>
        <dd className="m-0 pt-1 text-lg font-bold text-white max-[640px]:text-base">
          {formatRupiah(totalPayment)}
        </dd>
      </dl>
    </section>
  );
}

function PaymentContent({
  adminFee,
  error,
  formatRupiah,
  isLoading,
  isSubmitting,
  onPay,
  plan,
  totalPayment,
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bca_va");

  if (isLoading && !plan) {
    return (
      <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
        <Navbar />
        <main className="grid min-h-[60svh] place-items-center px-5">
          <PageMessage message="Memuat ringkasan pembayaran..." />
        </main>
        <Footer />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
        <Navbar />
        <main className="grid min-h-[60svh] place-items-center px-5">
          <PageMessage
            message={error || "Paket langganan tidak tersedia."}
            variant="danger"
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c] px-20 pb-[108px] pt-[118px] max-[900px]:px-5 max-[640px]:pb-10 max-[640px]:pt-8">
        <h1 className="m-0 text-[32px] font-bold leading-[1.2] max-[640px]:text-xl">
          Ringkasan Pembayaran
        </h1>

        <div className="mt-10 grid grid-cols-[236px_minmax(0,1fr)] gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[640px]:mt-5">
          <SubscriptionPackageCard
            className="max-[640px]:!max-w-none"
            plan={plan}
          />

          <div className="pt-1 max-[900px]:pt-0">
            <section aria-labelledby="payment-method-title">
              <h2
                id="payment-method-title"
                className="m-0 text-lg font-medium leading-[1.4]"
              >
                Metode Pembayaran
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-4 max-[760px]:grid-cols-1 max-[640px]:gap-4">
                {paymentMethods.map((method) => (
                  <PaymentMethodOption
                    key={method.id}
                    selected={selectedPaymentMethod === method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    {method.icon}
                    <span>{method.label}</span>
                  </PaymentMethodOption>
                ))}
              </div>
            </section>

            <section className="mt-4" aria-labelledby="voucher-title">
              <h2
                id="voucher-title"
                className="m-0 text-lg font-medium leading-[1.4]"
              >
                Kode Voucher (Jika ada)
              </h2>
              <div className="mt-5 flex gap-4 max-[640px]:gap-4">
                <input
                  className="min-h-12 flex-1 rounded border border-white/80 bg-transparent px-3 text-base text-white outline-none placeholder:text-[#8b8f92] focus:border-white max-[640px]:min-w-0 max-[640px]:text-xs"
                  placeholder="Masukkan kode voucher"
                  type="text"
                />
                <button
                  className="min-h-12 min-w-[117px] rounded-full bg-[#34393a] px-6 text-base font-bold text-white transition-colors hover:bg-[#2b3031] max-[640px]:min-w-[82px] max-[640px]:px-4 max-[640px]:text-sm"
                  type="button"
                >
                  Gunakan
                </button>
              </div>
            </section>

            <TransactionSummary
              adminFee={adminFee}
              formatRupiah={formatRupiah}
              plan={plan}
              totalPayment={totalPayment}
            />

            {error ? (
              <PageMessage
                className="mt-5 max-w-[470px] px-4 py-3 text-left"
                message={error}
                variant="danger"
              />
            ) : null}

            <button
              className="mt-5 inline-flex min-h-[42px] min-w-[94px] items-center justify-center rounded-full bg-[#0f1e93] px-6 text-base font-bold text-white transition-colors hover:bg-[#1728b8] disabled:opacity-60 max-[640px]:mt-4 max-[640px]:min-h-10 max-[640px]:min-w-[70px] max-[640px]:text-sm"
              disabled={isSubmitting}
              type="button"
              onClick={() => onPay?.(selectedPaymentMethod)}
            >
              {isSubmitting ? "Memproses..." : "Bayar"}
            </button>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}

export { BcaIcon, CardBrandIcons, PaymentMethodOption, TransactionSummary };
export default PaymentContent;
