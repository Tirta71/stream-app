import { Link } from "react-router-dom";
import Footer from "../layout/Footer.jsx";
import Navbar from "../layout/Navbar.jsx";
import SubscriptionPackageCard from "../subscription/SubscriptionPackageCard.jsx";
import PageTransition from "../ui/PageTransition.jsx";
import {
  BcaIcon,
  PaymentMethodOption,
  TransactionSummary,
} from "./PaymentContent.jsx";

function CountdownBox({ label, value }) {
  return (
    <span className="inline-flex min-h-[49px] min-w-[96px] items-center justify-center rounded-md bg-[#34393f] px-4 text-2xl font-bold leading-none max-[640px]:min-h-[42px] max-[640px]:min-w-[75px] max-[640px]:text-base">
      {value}
      <span className="ml-1.5 text-lg font-normal text-white/70 max-[640px]:text-xs">
        {label}
      </span>
    </span>
  );
}

function CountdownBanner() {
  return (
    <section className="rounded-[10px] bg-[#202829] px-6 py-7 text-center max-[640px]:rounded-lg max-[640px]:px-6 max-[640px]:py-7">
      <h1 className="m-0 text-base font-normal leading-[1.4]">
        Lakukan Pembayaran Sebelum
      </h1>
      <div className="mt-4 flex items-center justify-center gap-4 max-[640px]:gap-2.5">
        <CountdownBox label="Jam" value="00" />
        <span className="text-2xl font-bold max-[640px]:text-xl">:</span>
        <CountdownBox label="Menit" value="14" />
        <span className="text-2xl font-bold max-[640px]:text-xl">:</span>
        <CountdownBox label="Detik" value="58" />
      </div>
    </section>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
      viewBox="0 0 24 24"
    >
      <path d="M8 8h10v12H8z" />
      <path d="M6 16H4V4h10v2" />
    </svg>
  );
}

function PaymentMeta() {
  return (
    <dl className="m-0 mt-5 grid grid-cols-[1fr_auto] gap-y-3 text-base leading-[1.35] max-[640px]:text-xs">
      <dt className="text-white/70">Tanggal Pembelian</dt>
      <dd className="m-0 text-white">08 Juni 2023</dd>
      <dt className="text-white/70">Kode Pembayaran</dt>
      <dd className="m-0 flex items-center gap-2 text-white">
        3KDJ5XFOV
        <button
          aria-label="Salin kode pembayaran"
          className="grid h-6 w-6 place-items-center border-0 bg-transparent p-0 text-[#3254ff]"
          type="button"
        >
          <CopyIcon />
        </button>
      </dd>
    </dl>
  );
}

function PaymentInstructions() {
  return (
    <section className="mt-8 max-[640px]:mt-6" aria-labelledby="instruction-title">
      <h2
        id="instruction-title"
        className="m-0 text-lg font-bold leading-[1.4] max-[640px]:text-base"
      >
        Tata Cara Pembayaran
      </h2>
      <ol className="m-0 mt-4 list-decimal space-y-1 pl-5 text-base leading-[1.35] text-white/70 max-[640px]:text-xs">
        <li>Buka aplikasi BCA Mobile Banking atau akses BCA Internet Banking.</li>
        <li>Login ke akun Anda.</li>
        <li>Pilih menu "Transfer" atau "Pembayaran".</li>
        <li>Pilih opsi "Virtual Account" atau "Virtual Account Number".</li>
        <li>
          Masukkan nomor virtual account dan jumlah pembayaran, lalu
          konfirmasikan pembayaran.
        </li>
      </ol>
    </section>
  );
}

function PaymentPendingContent({ adminFee, formatRupiah, plan, totalPayment }) {
  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c] px-20 pb-10 pt-10 max-[900px]:px-5 max-[640px]:pb-9 max-[640px]:pt-7">
        <CountdownBanner />

        <h1 className="m-0 mt-10 text-[32px] font-bold leading-[1.2] max-[640px]:mt-6 max-[640px]:text-xl">
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
              <div className="mt-3">
                <PaymentMethodOption selected>
                  <BcaIcon />
                  <span>BCA Virtual Account</span>
                </PaymentMethodOption>
              </div>
            </section>

            <PaymentMeta />

            <TransactionSummary
              adminFee={adminFee}
              formatRupiah={formatRupiah}
              plan={plan}
              totalPayment={totalPayment}
            />

            <PaymentInstructions />

            <Link
              className="mt-8 inline-flex min-h-[42px] min-w-[94px] items-center justify-center rounded-full bg-[#0f1e93] px-6 text-base font-bold text-white transition-colors hover:bg-[#1728b8] max-[640px]:mt-5 max-[640px]:min-h-10 max-[640px]:min-w-[70px] max-[640px]:text-sm"
              to="/profil?premium=true"
            >
              Bayar
            </Link>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}

export default PaymentPendingContent;
