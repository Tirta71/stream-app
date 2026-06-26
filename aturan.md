# Aturan Main Project Chill App

File ini wajib dibaca dulu sebelum mengerjakan perubahan baru di project ini.
Tujuannya supaya struktur folder, alur data, dan tampilan tetap konsisten.

## Workflow

- Sebelum mengubah kode, baca dulu file terkait dan pahami pola yang sudah ada.
- Jangan menghapus atau mengembalikan perubahan yang sudah ada tanpa diminta.
- Kalau diminta push, cek dulu perubahan yang ikut ke commit.
- Kalau user bilang "tanpa md", jangan ikutkan file `.md` ke commit.
- Setelah perubahan kode, jalankan `npm.cmd run lint`.
- Untuk build, jalankan `npm.cmd run build`. Jika gagal karena izin `node_modules/.vite-temp`, ulangi dengan izin luar sandbox.

## Struktur Folder

- Semua komponen public/frontend masuk ke `src/components/public`.
- Semua komponen admin masuk ke `src/components/admin`.
- Komponen layout public masuk ke `src/components/public/layout`.
  Contoh: `Navbar`, `Footer`, `HeroSection`, `LoadingScreen`.
- Komponen layout admin masuk ke folder layout admin.
  Contoh: `AdminNavbar`, `AdminFooter`.
- Komponen yang khusus untuk satu page harus masuk folder sesuai nama page.
  Contoh: komponen page MyList masuk ke `src/components/public/myList`.
- Komponen reusable kecil yang bisa dipakai banyak page masuk ke `src/components/public/ui`.
  Contoh: `Button`, `FormInput`, `PageTitle`, `PageMessage`.
- Page public masuk ke `src/pages/public`.
- Page admin masuk ke `src/pages/admin`.
- Custom hook public masuk ke `src/hooks/public`.
- Custom hook admin masuk ke `src/hooks/admin`.

## Redux dan Data

- Data movie utama disimpan di Redux, bukan langsung di state page.
- Store Redux ada di `src/store/redux/store.js`.
- Slice movie ada di `src/store/redux/moviesSlice.js`.
- API request movie dikerjakan lewat thunk Redux seperti `fetchMovies`.
- Page jangan terlalu banyak berisi logic Redux.
  Gunakan custom hook seperti `useHomeMovies` dan `useMyListMovies`.
- `useDispatch`, `useSelector`, dan transform data sebaiknya berada di custom hook, bukan langsung di page.
- Fetch data movie dilakukan saat status masih `idle`, supaya request tidak berulang tanpa perlu.

## MockAPI dan Axios

- Data movie berasal dari MockAPI lewat Axios.
- URL API disimpan di `.env` dengan key `VITE_MOVIES_API_URL`.
- Jangan tampilkan tulisan atau disclaimer bahwa data berasal dari MockAPI di UI.
- Frontend harus pure memakai data API, jangan menampilkan data lama/fallback lokal secara sekilas saat refresh.
- Jika data kosong, section homepage tidak perlu tampil.
- Section yang memiliki data harus otomatis naik dan tampil sesuai data API.

## Skema Data Movie

Field yang dipakai project ini:

```txt
slug            String
title           String
image           String
category        String
rating          String
badge           String
top             Boolean
description     String
previewImage    String
ageRating       String
episodeCount    String
duration        String
episodeTitle    String
genres          String
progress        Number
previewType     String
type            String
section         String
sectionTitle    String
sectionOrder    Number
```

Catatan:

- `category` untuk kategori/kelompok data lama jika masih diperlukan.
- `genres` untuk genre film seperti Drama, Action, Komedi.
- `section` untuk menentukan masuk section homepage mana.
- `sectionTitle` untuk judul section yang tampil di homepage.
- `sectionOrder` untuk urutan section.
- `type` untuk jenis konten utama, isi `movie` atau `series`.
- `previewType` berisi `movie`, `series`, atau `continue`.
- `continueWatching` bukan genre. Itu masuk konsep section atau progress menonton.
- `image` dan `previewImage` boleh sama jika tidak punya gambar khusus untuk hover.
- Untuk movie, `episodeCount` bisa diisi `Movie`.
- Untuk series, `episodeCount` berisi jumlah episode, misalnya `16 Episode`.
- Untuk continue watching, gunakan `episodeTitle`, `duration`, dan `progress`.

## Home Page

- Home page harus mengambil data dari Redux lewat hook.
- Section homepage dibuat otomatis berdasarkan field `section`, `sectionTitle`, dan `sectionOrder`.
- Jangan menambah section secara manual di JSX jika bisa dari data.
- Jika tidak ada data di satu section, judul section itu jangan ditampilkan.
- Komponen page Home harus tetap clean:
  - `Navbar`
  - `HeroSection`
  - daftar `MovieSection`
  - `Footer`
- Mapping data API ke bentuk UI dilakukan di `src/utils/movieMapper.js`.

## Movie Card dan Hover

- `MovieCard` harus reusable untuk Home dan MyList.
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

## MyList Page

- Route MyList adalah `/daftar-saya`.
- MyList mengambil data dari Redux dulu untuk sementara.
- Logic data MyList berada di custom hook `useMyListMovies`.
- Komponen khusus MyList masuk ke `src/components/public/myList`.
- Judul page gunakan reusable component `PageTitle`.
- Loading, error, dan empty state gunakan reusable component `PageMessage`.
- Grid MyList harus responsive dan gap antar card jangan terlalu jauh.
- Mobile MyList harus rapat dengan navbar sesuai desain.

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

## Git dan Deploy

- Push ke GitHub hanya jika diminta.
- Deploy Vercel hanya jika diminta.
- Jangan commit `.env`.
- `.env.example` boleh dipakai untuk contoh key tanpa secret.
- Sebelum push, idealnya jalankan lint dan build.
