# Aturan Main Project Chill App

File ini wajib dibaca dulu sebelum mengerjakan perubahan baru di project ini.
Tujuannya supaya struktur folder, alur data, API, dan tampilan tetap konsisten.

## Workflow

- Sebelum mengubah kode, baca dulu file terkait dan pahami pola yang sudah ada.
- Jangan menghapus atau mengembalikan perubahan yang sudah ada tanpa diminta.
- Kalau diminta push, cek dulu perubahan yang ikut ke commit.
- Kalau user bilang "tanpa md", jangan ikutkan file `.md` ke commit.
- Setelah perubahan kode frontend, jalankan `npm.cmd run lint --prefix frontend`.
- Untuk build frontend, jalankan `npm.cmd run build --prefix frontend`.
- Untuk menjalankan frontend lokal, gunakan `npm.cmd run dev --prefix frontend`.
- Untuk menjalankan backend lokal, gunakan `npm.cmd run dev --prefix backend`.
- Untuk Prisma backend:
  - Generate client: `npm.cmd run prisma:generate --prefix backend`
  - Migrate DB: `npm.cmd run prisma:migrate --prefix backend`
  - Seed data: `npm.cmd run seed --prefix backend`
- Perubahan `.md` saja tidak wajib menjalankan lint/build.

## Struktur Project

- Project memakai struktur monorepo:

```txt
chill-app-tirta/
  frontend/
  backend/
  aturan.md
  vercel.json
```

- Frontend React berada di folder `frontend`.
- Backend Express, Prisma, dan MySQL berada di folder `backend`.
- Jangan memindahkan backend keluar repo utama jika tujuannya masih satu project Chill App.
- Jangan commit `.env`.
- `.env.example` boleh dipakai untuk contoh key tanpa secret.

## Struktur Folder Frontend

- Semua komponen public/frontend masuk ke `frontend/src/components/public`.
- Semua komponen admin masuk ke `frontend/src/components/admin`.
- Komponen layout public masuk ke `frontend/src/components/public/layout`.
  Contoh: `Navbar`, `Footer`, `HeroSection`, `LoadingScreen`.
- Komponen layout admin masuk ke folder layout admin.
  Contoh: `AdminNavbar`, `AdminFooter`.
- Komponen yang khusus untuk satu page harus masuk folder sesuai nama page.
  Contoh: komponen page MyList masuk ke `frontend/src/components/public/myList`.
- Komponen reusable kecil yang bisa dipakai banyak page masuk ke `frontend/src/components/public/ui`.
  Contoh: `Button`, `FormInput`, `PageTitle`, `PageMessage`.
- Custom hook public masuk ke `frontend/src/hooks/public`.
- Custom hook admin masuk ke `frontend/src/hooks/admin`.

## Struktur Page Public

- Page public masuk ke `frontend/src/pages/public`.
- Page auth dikelompokkan di `frontend/src/pages/public/auth`.
  Contoh: `Login`, `Register`, `GoogleAuthCallback`.
- Page katalog movie dan series digabung di `frontend/src/pages/public/content`.
  Contoh: `Movie`, `Series`.
- Page home masuk ke `frontend/src/pages/public/home`.
- Page my list masuk ke `frontend/src/pages/public/myList`.
- Page profile masuk ke `frontend/src/pages/public/profile`.
- Page subscription/langganan masuk ke `frontend/src/pages/public/subscription`.
- Page payment masuk ke `frontend/src/pages/public/payment`.
- Jangan membuat folder page terlalu kecil kalau isinya masih satu flow yang sama.

## Backend API

- Data utama sekarang berasal dari backend sendiri, bukan MockAPI.
- Backend memakai Express, Prisma, dan MySQL.
- Base URL API frontend disimpan di `.env` frontend dengan key `VITE_API_BASE_URL`.
  Contoh: `VITE_API_BASE_URL=http://localhost:5000/api/v1`.
- Jangan menambah koneksi MockAPI baru untuk fitur utama.
- `VITE_MOVIES_API_URL` dan `VITE_WATCH_PROGRESS_API_URL` hanya dianggap legacy override sementara. Untuk development baru, pakai `VITE_API_BASE_URL`.
- Semua request API frontend memakai Axios dari folder `frontend/src/services`.
- Request yang butuh login harus memakai `withCredentials: true`.
- Token auth disimpan oleh backend dalam cookie `httpOnly` bernama `chill_token`.
- Jangan simpan JWT di `localStorage` atau `sessionStorage`.
- Semua halaman public utama harus lewat `ProtectedRoute`, kecuali login, register, dan Google callback.
- Endpoint backend berada di prefix `/api/v1`.

## Response API

- Response sukses backend memakai format:

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "Success",
  "data": null,
  "meta": null
}
```

- Response error tidak boleh menampilkan `stack` ke client.
- Gunakan `code` yang jelas untuk error, misalnya `VALIDATION_ERROR`, `UNAUTHORIZED`, `NOT_FOUND`, atau `INTERNAL_SERVER_ERROR`.
- Frontend mengambil payload utama dari `response.data.data`.
- Pesan error UI diambil dari `response.data.message`.

## Auth

- Login email memakai endpoint `/auth/login`.
- Register memakai endpoint `/auth/register`.
- Cek session user memakai endpoint `/auth/me`.
- Logout memakai endpoint `/auth/logout`.
- Login Google memakai OAuth backend lewat `/auth/google`.
- Callback Google frontend berada di route `/auth/google/callback`.
- Backend membutuhkan env:
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REDIRECT_URI`
  - `CLIENT_URL`
- Untuk Google login real, jangan pakai dummy login di frontend.

## Redux dan Data

- Data movie utama disimpan di Redux, bukan langsung di state page.
- Store Redux ada di `frontend/src/store/redux/store.js`.
- Slice movie ada di `frontend/src/store/redux/moviesSlice.js`.
- API request movie dikerjakan lewat thunk Redux seperti `fetchMovies`.
- Page jangan terlalu banyak berisi logic Redux.
  Gunakan custom hook seperti `useHomeMovies`, `useMovieMovies`, `useSeriesMovies`, dan `useMyListMovies`.
- `useDispatch`, `useSelector`, dan transform data sebaiknya berada di custom hook, bukan langsung di page.
- Fetch data movie dilakukan saat status masih `idle`, supaya request tidak berulang tanpa perlu.
- Data watch progress diambil dari endpoint `/watch-progress` dan dipakai untuk section continue watching.

## Skema Data Konten

- Sumber data utama backend adalah tabel `series_films`.
- Walaupun nama tabel `series_films`, isinya mencakup movie dan series.
- Pembedanya adalah field `type` dengan nilai `movie` atau `series`.
- Field utama konten dari backend:

```txt
id
slug
title
type
description
image
preview_image
rating
age_rating
badge
release_year
is_top_ten
is_active
is_trending
is_premium
trailer_url
published_at
genres
episodes
people
```

- Field episode dari backend:

```txt
id
series_film_id
title
description
season_number
episode_number
duration
video_url
thumbnail_url
```

- Field watch progress:

```txt
id
user_id
series_film_id
episode_movie_id
progress_percent
last_position_seconds
last_watched_at
```

- Frontend mapper ada di `frontend/src/utils/movieMapper.js`.
- Mapper boleh mendukung field lama camelCase untuk kompatibilitas, tapi data baru dari backend sebaiknya pakai snake_case sesuai Prisma/API.
- Untuk movie, durasi tetap diambil dari `episodes[0].duration`.
- Untuk series, jumlah episode dihitung dari panjang array `episodes`.
- Untuk playback legal, gunakan `trailer_url` atau `episode.video_url` berupa trailer/demo, bukan full movie berlisensi.
- `is_premium` menentukan badge Premium dan akses konten premium.
- User premium atau tidak dicek dari subscription user, bukan dari data movie saja.

## Section Home, Movie, dan Series

- Section tampilan sekarang dibuat dari config statis di custom hook, lalu isinya difilter dari data API.
- Jangan menambah field `section` baru untuk kebutuhan section utama jika bisa difilter dari field database.
- Home boleh menampilkan campuran movie dan series.
- Page Film hanya menampilkan data dengan `type === "movie"`.
- Page Series hanya menampilkan data dengan `type === "series"`.
- Continue watching berasal dari `watch_progress`, bukan manual dari data movie.
- Top rating menggunakan sorting `rating`.
- Top 10 menggunakan `is_top_ten`.
- Trending menggunakan `is_trending`.
- Rilis baru menggunakan `published_at` dan fallback `release_year`.
- Premium menggunakan `is_premium`.
- Jika data section kosong, judul section tidak perlu tampil.
- Mapping data API ke bentuk UI dilakukan di `frontend/src/utils/movieMapper.js`.

## Home Page

- Home page harus mengambil data dari Redux lewat hook.
- Komponen page Home harus tetap clean dan hanya mengirim props ke content component.
- Layout Home berada di komponen public terkait, bukan semua logic ditulis di page.
- Jangan menampilkan fallback data lama secara sekilas saat refresh.
- Jika data kosong, tampilkan empty state seperlunya dan jangan tampilkan title section kosong.

## Movie Card dan Hover

- `MovieCard` harus reusable untuk Home, Movie, Series, dan MyList.
- Untuk MyList, gunakan `MovieCard` dengan size compact.
- Hover card memiliki tiga jenis:
  - `movie`
  - `series`
  - `continue`
- Hover movie menampilkan durasi.
- Hover series menampilkan jumlah episode.
- Hover continue menampilkan episode title, progress bar, dan durasi.
- Hover continue menggunakan ukuran sekitar `409px x 494px`.
- Hover movie dan series menggunakan ukuran sekitar `409px x 453px`.
- Posisi hover harus stabil di tengah card saat slider digeser.
- Jika card berada dekat ujung kiri atau kanan carousel, hover boleh bergeser agar tidak kepotong dan tombol play tetap bisa diklik.
- Font genre/category di hover continue harus sama dengan hover movie dan series.
- Jangan sampai hover tertutup arrow carousel.
- Di mobile, hover tidak wajib muncul. Tap/click card boleh langsung membuka detail modal.

## Detail Modal

- Detail series dan detail movie punya tampilan berbeda.
- Detail series menampilkan daftar episode.
- Detail movie menampilkan rekomendasi serupa.
- Data cast, director, dan creator berasal dari relasi `people`.
- Genre berasal dari relasi `genres`.
- Jangan hardcode detail jika data sudah tersedia dari API.

## MyList Page

- Route MyList adalah `/daftar-saya`.
- Untuk sementara MyList masih boleh mengambil data dari Redux jika endpoint my-list belum dihubungkan penuh.
- Saat backend my-list sudah siap, gunakan endpoint `/my-lists`.
- Logic data MyList berada di custom hook `useMyListMovies`.
- Komponen khusus MyList masuk ke `frontend/src/components/public/myList`.
- Judul page gunakan reusable component `PageTitle`.
- Loading, error, dan empty state gunakan reusable component `PageMessage`.
- Grid MyList harus responsive dan gap antar card jangan terlalu jauh.
- Mobile MyList harus rapat dengan navbar sesuai desain.

## Subscription dan Payment

- Page langganan berada di route `/langganan`.
- Page ringkasan pembayaran berada di route `/pembayaran`.
- Page pembayaran menunggu berada di route `/pembayaran/menunggu`.
- Data package idealnya berasal dari endpoint `/packages`.
- Order dibuat lewat endpoint `/orders`.
- Payment diproses lewat endpoint `/payments`.
- Subscription aktif dicek lewat endpoint `/subscriptions`.
- Jangan simpan status premium hanya di frontend.

## Admin Page

- Admin tidak boleh memakai navbar/footer frontend.
- Komponen admin harus terpisah dari komponen public.
- Data movie di admin harus memakai pagination.
- Data movie jangan membuat tinggi card kanan melebihi card kiri.
- Jangan ada scrollbar internal di card data movie jika tidak diperlukan.
- Kolom kiri dan kanan admin harus seimbang.
- Admin page harus responsive di mobile.
- Logic API/admin dipisahkan ke custom hook admin seperti `useManageMovies`.

## Navbar dan Footer

- Navbar public harus memiliki active route yang lebih terang.
- Link `Daftar Saya` mengarah ke `/daftar-saya`.
- Navbar admin tidak boleh tampil di frontend public.
- Footer desktop tidak boleh menampilkan icon `>`.
- Icon `>` footer hanya untuk mobile accordion.

## Responsive

- Selalu cek desktop dan mobile.
- Di mobile, tombol hero seperti `Mulai`, `Selengkapnya`, `18+`, dan sound harus sejajar sesuai desain.
- Sound button mobile berada di pojok kanan sendiri.
- Hindari elemen melebar keluar layar.
- Hindari scrollbar horizontal yang tidak disengaja.

## Reusable Component

- Buat reusable component jika elemen dipakai ulang atau berpotensi dipakai banyak page.
- Jangan membuat terlalu banyak folder kecil yang membingungkan.
- Folder komponen page harus mengikuti nama page.
- Komponen yang sifatnya umum masuk ke `ui`.
- Komponen yang sifatnya layout masuk ke `layout`.

## Performa

- Hindari gambar terlalu besar dari sumber eksternal.
- Untuk poster gunakan ukuran yang cukup, jangan selalu memakai original size.
- Tambahkan `loading="lazy"` pada gambar list/card jika memungkinkan.
- Modal detail jangan melakukan render data berat yang tidak diperlukan.
- Jika bundle frontend makin besar, pertimbangkan dynamic import untuk page besar atau modal besar.

## Git dan Deploy

- Push ke GitHub hanya jika diminta.
- Deploy Vercel hanya jika diminta.
- Jangan commit `.env`.
- `.env.example` boleh dipakai untuk contoh key tanpa secret.
- Sebelum push, idealnya jalankan lint dan build.
- Vercel root project memakai konfigurasi root `vercel.json` dan build frontend dari folder `frontend`.
