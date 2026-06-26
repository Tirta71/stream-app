import { Link } from "react-router-dom";
import Footer from "../layout/Footer.jsx";
import Navbar from "../layout/Navbar.jsx";
import MovieDetailModal from "../movie/MovieDetailModal.jsx";
import MyListGrid from "../myList/MyListGrid.jsx";
import SeriesDetailModal from "../series/SeriesDetailModal.jsx";
import PageMessage from "../ui/PageMessage.jsx";
import PageTransition from "../ui/PageTransition.jsx";

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] max-[640px]:h-[18px] max-[640px]:w-[18px]"
    >
      <path d="M12 16V4" />
      <path d="m8 8 4-4 4 4" />
      <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current max-[640px]:h-5 max-[640px]:w-5"
    >
      <path d="M4 17.5V21h3.5L18.06 10.44l-3.5-3.5L4 17.5Zm16.71-9.77a1 1 0 0 0 0-1.41l-2.03-2.03a1 1 0 0 0-1.41 0l-1.59 1.59 3.5 3.5 1.53-1.65Z" />
    </svg>
  );
}

function SubscriptionIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      aria-hidden="true"
      className="h-16 w-16 shrink-0 max-[640px]:h-[74px] max-[640px]:w-[74px]"
    >
      <ellipse
        cx="31"
        cy="47"
        rx="20"
        ry="8"
        fill="none"
        stroke="#f0b431"
        strokeWidth="6"
        transform="rotate(28 31 47)"
      />
      <circle cx="31" cy="47" r="14" fill="#2f57dd" />
      <circle cx="25" cy="41" r="4" fill="#ffcf6e" />
      <path d="M54 14h12l-4 28h-8L54 14Z" fill="#ff675b" />
      <path d="M55 51h8v8h-8v-8Z" fill="#ff675b" />
      <path d="M49 20 38 11l-5 7 13 6 3-4Z" fill="#ff675b" />
    </svg>
  );
}

function ProfileField({ editable = false, label, value }) {
  return (
    <div className="flex min-h-16 items-center justify-between rounded-md border border-[#4a5358] bg-[#202829] px-4 py-2.5 max-[640px]:min-h-[56px]">
      <div className="min-w-0">
        <p className="m-0 text-base font-semibold leading-[1.2] text-[#a8aaad] max-[640px]:text-sm">
          {label}
        </p>
        <p className="m-0 mt-1 truncate text-lg leading-[1.2] text-white max-[640px]:text-base">
          {value}
        </p>
      </div>
      {editable ? (
        <button
          type="button"
          className="ml-4 grid h-8 w-8 shrink-0 place-items-center border-0 bg-transparent text-white"
          aria-label={`Ubah ${label}`}
        >
          <EditIcon />
        </button>
      ) : null}
    </div>
  );
}

function SubscriptionCard({ isSubscribed, subscription }) {
  if (isSubscribed) {
    return (
      <aside className="rounded-[10px] bg-[linear-gradient(110deg,#5574e8_0%,#1727bf_100%)] px-6 py-6 text-white shadow-[0_22px_50px_rgba(0,0,0,0.16)] min-[901px]:mt-[61px] max-[640px]:order-first max-[640px]:rounded-lg max-[640px]:px-6 max-[640px]:py-6">
        <span className="inline-flex h-9 min-w-[82px] items-center justify-center rounded-full bg-[#c4cbd8] px-5 text-base font-bold text-[#0f1e93] max-[640px]:h-[34px] max-[640px]:min-w-[86px] max-[640px]:text-sm">
          Aktif
        </span>
        <h2 className="m-0 mt-6 text-2xl font-bold leading-[1.25] max-[640px]:mt-5 max-[640px]:text-xl">
          {subscription.planName}
        </h2>
        <p className="m-0 mt-4 text-base leading-[1.45] text-white/95 max-[640px]:text-sm">
          Saat ini kamu sedang menggunakan akses akun premium
        </p>
        <p className="m-0 mt-7 text-base leading-[1.4] text-white/70 max-[640px]:mt-6 max-[640px]:text-sm">
          Berlaku hingga {subscription.expiredAt}
        </p>
      </aside>
    );
  }

  return (
    <aside className="grid grid-cols-[72px_minmax(0,1fr)] gap-6 rounded-[10px] bg-[#3d4243] px-6 py-7 text-white min-[901px]:mt-[61px] max-[640px]:order-first max-[640px]:grid-cols-[72px_minmax(0,1fr)] max-[640px]:gap-4 max-[640px]:rounded-lg max-[640px]:px-6 max-[640px]:py-6">
      <SubscriptionIcon />
      <div>
        <h2 className="m-0 text-2xl font-bold leading-[1.25] max-[640px]:text-xl">
          <span className="max-[640px]:hidden">
            Saat ini anda belum berlangganan
          </span>
          <span className="hidden max-[640px]:inline">Berlangganan</span>
        </h2>
        <p className="m-0 mt-4 max-w-[420px] text-lg leading-[1.35] text-white/90 max-[640px]:text-base">
          Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
        </p>
        <Link
          className="ml-auto mt-6 flex w-fit min-h-[34px] min-w-[190px] items-center justify-center rounded-full bg-[#2f3334] px-6 text-base font-bold text-white transition-colors hover:bg-[#25292a] max-[640px]:ml-0 max-[640px]:min-h-[34px] max-[640px]:min-w-[154px] max-[640px]:text-sm"
          to="/langganan"
        >
          Mulai Berlangganan
        </Link>
      </div>
    </aside>
  );
}

function ProfileForm({ profile }) {
  return (
    <section>
      <h1 className="m-0 text-[32px] font-bold leading-[1.2] max-[640px]:text-xl">
        Profil Saya
      </h1>

      <div className="mt-8 flex items-center gap-6 max-[640px]:mt-6 max-[640px]:gap-5">
        <img
          className="h-[140px] w-[140px] rounded-full bg-[#c8d1ee] object-cover max-[640px]:h-20 max-[640px]:w-20"
          src={profile.photoUrl}
          alt="Foto profil"
        />
        <div className="flex flex-col items-start gap-2 max-[640px]:gap-1">
          <button
            type="button"
            className="min-h-10 min-w-[120px] rounded-full border border-[#3254ff] bg-transparent px-5 text-base font-bold text-[#3254ff] transition-colors hover:bg-[#3254ff]/10 max-[640px]:min-h-9 max-[640px]:min-w-[93px] max-[640px]:px-4 max-[640px]:text-sm"
          >
            Ubah Foto
          </button>
          <p className="m-0 mt-3 inline-flex items-center gap-2 text-sm text-[#c1c2c4] max-[640px]:text-xs">
            <UploadIcon />
            {profile.maxUploadSize}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8 max-[640px]:mt-7 max-[640px]:space-y-6">
        <ProfileField editable label="Nama Pengguna" value={profile.name} />
        <ProfileField label="Email" value={profile.email} />
        <ProfileField editable label="Kata Sandi" value={profile.password} />
      </div>

      <button
        type="button"
        className="mt-8 min-h-[42px] min-w-[105px] rounded-full bg-[#0f1e93] px-6 text-base font-bold text-white transition-colors hover:bg-[#1728b8] max-[640px]:hidden"
      >
        Simpan
      </button>
    </section>
  );
}

function ProfileContent({
  error,
  isLoading,
  isSubscribed,
  movies,
  onCloseMovieDetail,
  onCloseSeriesDetail,
  onShowMovieDetail,
  onShowSeriesDetail,
  profile,
  selectedMovieDetail,
  selectedSeriesDetail,
  status,
  subscription,
}) {
  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c] px-20 pb-20 pt-10 max-[900px]:px-5 max-[640px]:pb-9 max-[640px]:pt-7">
        <div className="grid grid-cols-[minmax(0,642px)_minmax(360px,558px)] items-start justify-between gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-7">
          <ProfileForm profile={profile} />
          <SubscriptionCard
            isSubscribed={isSubscribed}
            subscription={subscription}
          />
        </div>

        <section
          className="mt-20 max-[640px]:mt-6"
          aria-labelledby="profile-list-title"
        >
          <div className="mb-8 flex items-center justify-between max-[640px]:mb-4">
            <h2
              id="profile-list-title"
              className="m-0 text-[32px] font-bold leading-[1.2] max-[640px]:text-xl"
            >
              Daftar Saya
            </h2>
            <Link
              className="text-base font-medium text-white transition-colors hover:text-white/80 max-[640px]:hidden"
              to="/daftar-saya"
            >
              Lihat Semua
            </Link>
          </div>

          {status === "failed" ? (
            <PageMessage
              className="mb-5 p-4 font-semibold"
              message={error}
              variant="danger"
            />
          ) : null}

          {isLoading && !movies.length ? (
            <PageMessage message="Memuat daftar..." />
          ) : (
            <MyListGrid
              movies={movies}
              onShowMovieDetail={onShowMovieDetail}
              onShowSeriesDetail={onShowSeriesDetail}
            />
          )}
        </section>
      </PageTransition>
      <MovieDetailModal
        detail={selectedMovieDetail}
        onClose={onCloseMovieDetail}
      />
      <SeriesDetailModal
        detail={selectedSeriesDetail}
        onClose={onCloseSeriesDetail}
      />
      <Footer />
    </div>
  );
}

export default ProfileContent;
