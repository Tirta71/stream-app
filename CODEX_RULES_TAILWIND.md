# CODEX RULES — React Refactor + Tailwind Migration

## Konteks Project

Project React ini **UI/slicing-nya sudah jadi** dan tampilannya sudah sesuai mockup.

Tugas Codex **bukan membuat ulang slicing**, **bukan redesign UI**, dan **bukan mengubah tampilan visual besar-besaran**.

Sekarang project ingin direfactor agar:
- Struktur folder lebih rapi.
- Component lebih reusable.
- Data antar component menggunakan props.
- Styling dimigrasikan ke **Tailwind CSS**.
- CSS manual dikurangi agar lebih mudah maintenance.
- Routing, responsive, dan build tetap aman.

---

## Requirement Tugas

Project harus memiliki:

1. Halaman **Home**
2. Halaman **Login**
3. Halaman **Register**
4. Reusable component
5. Passing data menggunakan props
6. Struktur kode rapi dan hirarki
7. Responsive desktop dan mobile
8. Styling menggunakan **Tailwind CSS**
9. Tampilan tetap sesuai mockup awal

---

## Aturan Dasar Untuk Codex

### 1. Jangan Redesign UI

Codex **tidak boleh**:
- Mengubah warna utama.
- Mengubah layout besar.
- Mengubah ukuran font secara besar-besaran.
- Mengubah spacing besar-besaran.
- Mengubah desain card, navbar, hero, login, register secara drastis.
- Membuat tampilan baru dari nol.

Yang boleh dilakukan:
- Memindahkan file.
- Memperbaiki import.
- Membuat component reusable.
- Mengubah struktur JSX agar lebih rapi.
- Mengubah CSS biasa menjadi class Tailwind.
- Menghapus duplikasi kecil.
- Menghapus file CSS yang sudah tidak dipakai.
- Memperbaiki bug styling akibat migrasi Tailwind.

---

### 2. Jangan Slicing Ulang

UI sudah selesai.

Codex hanya perlu melakukan:
- Refactor struktur code.
- Migrasi styling ke Tailwind CSS.
- Membuat reusable component.
- Menggunakan props.
- Merapikan folder.

Jangan membuat ulang UI dari awal.

---

### 3. Migrasi Ke Tailwind Tanpa Mengubah Desain

Project wajib dimigrasikan ke Tailwind CSS.

Namun hasil visual harus tetap sama seperti sebelum refactor.

Saat migrasi:
- Baca style CSS lama terlebih dahulu.
- Convert style lama ke class Tailwind yang setara.
- Jangan hapus CSS lama sebelum tampilan Tailwind benar-benar sama.
- Setelah style Tailwind aman, hapus import CSS lama yang sudah tidak dipakai.
- Hapus file CSS component/page yang sudah tidak digunakan.
- Jangan menaruh styling component di `global.css`.

---

### 4. Component Harus Reusable

Gunakan component kecil dan jelas tanggung jawabnya.

Contoh reusable component:
- `Navbar`
- `Footer`
- `AuthLayout`
- `HeroSection`
- `MovieSection`
- `MovieCard`
- `Button`
- `FormInput`

Component tidak boleh terlalu panjang jika bisa dipisah secara wajar.

---

### 5. Gunakan Props

Data tidak boleh terlalu banyak hardcode di component.

Contoh:
- `MovieCard` menerima props:
  - `title`
  - `image`
  - `genre`
  - `rating`
  - `description`

- `MovieSection` menerima props:
  - `title`
  - `movies`

Lalu render data menggunakan `.map()`.

---

### 6. Data Dipisahkan ke Folder Data

Data movie jangan ditulis langsung di `MovieCard` atau `MovieSection`.

Simpan data di:

```txt
src/data/movies.js
```

Contoh konsep:

```js
export const movies = [
  {
    id: 1,
    title: "Movie Title",
    image: "/path/image.png",
    genre: "Action",
    rating: "8.5",
  },
];
```

---

### 7. CSS Manual Dikurangi

Karena project akan menggunakan Tailwind CSS, maka file CSS manual harus dikurangi.

Folder `src/styles` hanya boleh digunakan untuk:

```txt
src/styles/
└─ global.css
```

`global.css` hanya boleh berisi:
- Import Tailwind.
- Font global jika diperlukan.
- Reset kecil jika diperlukan.
- Style body default jika diperlukan.
- Custom class global yang benar-benar dibutuhkan.

Jangan menaruh style khusus component/page di `global.css`.

---

## Struktur Folder Target

Refactor project menjadi struktur seperti ini:

```txt
src/
├─ assets/
│  └─ img/
│
├─ components/
│  ├─ layout/
│  │  ├─ Navbar/
│  │  │  └─ Navbar.jsx
│  │  ├─ Footer/
│  │  │  └─ Footer.jsx
│  │  └─ AuthLayout/
│  │     └─ AuthLayout.jsx
│  │
│  ├─ sections/
│  │  ├─ HeroSection/
│  │  │  └─ HeroSection.jsx
│  │  └─ MovieSection/
│  │     └─ MovieSection.jsx
│  │
│  ├─ movie/
│  │  └─ MovieCard/
│  │     └─ MovieCard.jsx
│  │
│  └─ ui/
│     ├─ Button/
│     │  └─ Button.jsx
│     └─ FormInput/
│        └─ FormInput.jsx
│
├─ data/
│  └─ movies.js
│
├─ pages/
│  ├─ Home.jsx
│  ├─ Login.jsx
│  └─ Register.jsx
│
├─ styles/
│  └─ global.css
│
├─ App.jsx
└─ main.jsx
```

Catatan penting:
- Folder `pages` **jangan dibuat folder lagi**.
- Gunakan langsung:
  - `pages/Home.jsx`
  - `pages/Login.jsx`
  - `pages/Register.jsx`

---

## Detail Refactor Yang Harus Dilakukan

### Layout Component

Pindahkan:

```txt
Navbar.jsx
Footer.jsx
AuthLayout.jsx
```

Menjadi:

```txt
components/layout/Navbar/Navbar.jsx
components/layout/Footer/Footer.jsx
components/layout/AuthLayout/AuthLayout.jsx
```

Styling component tersebut harus dikonversi ke Tailwind CSS langsung di JSX.

---

### Section Component

Pindahkan:

```txt
HeroSection.jsx
MovieSection.jsx
```

Menjadi:

```txt
components/sections/HeroSection/HeroSection.jsx
components/sections/MovieSection/MovieSection.jsx
```

Styling section harus dikonversi ke Tailwind CSS langsung di JSX.

---

### Movie Component

Pindahkan:

```txt
MovieCard.jsx
```

Menjadi:

```txt
components/movie/MovieCard/MovieCard.jsx
```

`MovieCard` wajib menerima data dari props.

Styling card harus dikonversi ke Tailwind CSS.

---

### UI Component

Buat reusable component:

```txt
components/ui/Button/Button.jsx
components/ui/FormInput/FormInput.jsx
```

Gunakan untuk halaman Login dan Register.

`Button` minimal menerima props:
- `children`
- `type`
- `variant`
- `className`
- `onClick`

`FormInput` minimal menerima props:
- `label`
- `type`
- `name`
- `placeholder`
- `value`
- `onChange`
- `required`

---

### Page File

Pindahkan:

```txt
Home.jsx
Login.jsx
Register.jsx
```

Menjadi langsung:

```txt
pages/Home.jsx
pages/Login.jsx
pages/Register.jsx
```

Jangan buat:

```txt
pages/Home/Home.jsx
pages/Login/Login.jsx
pages/Register/Register.jsx
```

Halaman tetap boleh menggunakan Tailwind class langsung di JSX.

---

## Routing

Pastikan routing tetap berjalan:

```txt
/          -> Home
/login     -> Login
/register  -> Register
```

Jika menggunakan React Router, pastikan semua import page sudah sesuai path baru.

Contoh:

```js
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
```

---

## Aturan Import

Setelah file dipindahkan:
- Perbaiki semua import JSX.
- Perbaiki semua import asset.
- Perbaiki import `global.css`.
- Hapus import CSS lama yang sudah tidak dipakai.
- Pastikan tidak ada path rusak.
- Pastikan asset image tetap muncul.
- Jangan biarkan file lama yang sudah tidak dipakai masih di-import.

---

## Aturan Tailwind

### 1. Tailwind Menjadi Styling Utama

Gunakan Tailwind class langsung di JSX.

Contoh:

```jsx
<div className="min-h-screen bg-black text-white">
  ...
</div>
```

---

### 2. Hindari Inline Style

Hindari:

```jsx
<div style={{ backgroundColor: "black" }}>
```

Gunakan Tailwind:

```jsx
<div className="bg-black">
```

Inline style hanya boleh dipakai jika benar-benar tidak bisa dilakukan dengan Tailwind.

---

### 3. Jangan Menumpuk Style di global.css

Jangan pindahkan semua CSS lama ke `global.css`.

`global.css` hanya untuk style global, bukan style component.

---

### 4. Gunakan Responsive Class Tailwind

Contoh:

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

Pastikan responsive tetap aman di:
- Desktop
- Tablet
- Mobile max-width 768px
- Mobile kecil max-width 480px

---

## Tailwind Setup

Jika Tailwind belum terpasang:
- Install Tailwind CSS yang kompatibel dengan React/Vite project ini.
- Pastikan Tailwind aktif.
- Pastikan `src/styles/global.css` meng-import Tailwind.
- Pastikan `main.jsx` meng-import `global.css`.

Contoh konsep import di `main.jsx`:

```js
import "./styles/global.css";
```

Contoh konsep isi `global.css`:

```css
@import "tailwindcss";
```

Jika project menggunakan setup Tailwind versi lama, sesuaikan konfigurasi dengan versi Tailwind yang terinstall.

---

## Responsive

Responsive harus tetap aman.

Minimal cek:
- Desktop
- Tablet
- Mobile max-width 768px
- Mobile kecil max-width 480px

Jika responsive lama menggunakan CSS media query, konversi ke responsive class Tailwind.

Jangan sampai migrasi Tailwind membuat tampilan mobile rusak.

---

## Build Check

Setelah refactor selesai, jalankan:

```bash
npm run build
```

Jika tersedia, jalankan juga:

```bash
npm run lint
```

Perbaiki error sampai build berhasil.

---

## Larangan Penting

Codex dilarang:

1. Mengubah desain besar-besaran.
2. Membuat ulang UI dari nol.
3. Menghapus asset yang masih dipakai.
4. Menghapus component yang masih dipakai.
5. Membuat folder page seperti `pages/Home/Home.jsx`.
6. Menaruh seluruh style component di `global.css`.
7. Meninggalkan import CSS lama yang sudah tidak ada.
8. Membiarkan build error.
9. Mengubah routing tanpa alasan.
10. Mengubah mockup visual utama.

---

## Prompt Utama Untuk Codex

Gunakan instruksi ini:

```txt
Baca dan ikuti seluruh aturan pada file CODEX_RULES.md.

Project React saya UI/slicing-nya sudah jadi dan tampilannya sudah sesuai mockup.

Tolong refactor project ini agar:
1. Struktur folder lebih hirarki.
2. Component lebih reusable.
3. Data antar component dikirim menggunakan props.
4. Data movie dipindah ke src/data/movies.js.
5. Styling dimigrasikan dari CSS biasa ke Tailwind CSS.
6. CSS manual yang sudah tidak dipakai dihapus.
7. src/styles hanya berisi global.css.
8. Folder pages jangan dibuat folder lagi.
9. Gunakan langsung pages/Home.jsx, pages/Login.jsx, dan pages/Register.jsx.
10. Routing tetap berjalan.
11. Responsive tetap aman.
12. Build berhasil.

Jangan redesign UI.
Jangan slicing ulang.
Jangan mengubah tampilan visual besar-besaran.
Migrasi Tailwind harus menghasilkan tampilan yang sama seperti sebelum refactor.

Setelah selesai, berikan ringkasan:
- File/folder apa saja yang dipindah.
- Component reusable apa saja yang dibuat.
- Props digunakan di bagian mana.
- Data movie dipindah ke file apa.
- CSS apa saja yang berhasil dihapus.
- Apakah Tailwind sudah aktif.
- Apakah npm run build berhasil.
```

---

## Output Yang Diharapkan Dari Codex

Setelah selesai, Codex harus menjelaskan:

1. Folder/component yang dipindah.
2. Component reusable yang dibuat.
3. Props yang digunakan.
4. File data yang dibuat.
5. File CSS yang dihapus.
6. Status Tailwind.
7. Status routing.
8. Status responsive.
9. Status build.
10. Error jika masih ada.

---

## Catatan Penting

Refactor ini bertujuan untuk membuat project terlihat lebih rapi dan sesuai konsep React component modern dengan Tailwind CSS.

Prioritas utama:
1. UI tetap sama.
2. Struktur lebih clean.
3. Component reusable.
4. Props jelas.
5. Styling menggunakan Tailwind.
6. CSS manual berkurang.
7. Folder pages tetap simple.
8. Build berhasil.
