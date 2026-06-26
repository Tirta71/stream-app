# Dokumentasi Test Postman CHILL API

Dokumentasi ini dipakai untuk mengetes backend `backend-chill-app` lewat Postman.

## Import Collection

File yang bisa langsung di-import ke Postman:

```txt
docs/CHILL_API.postman_collection.json
docs/CHILL_API.postman_environment.json
```

Cara import:

1. Buka Postman.
2. Klik `Import`.
3. Pilih kedua file JSON di atas.
4. Aktifkan environment `CHILL API Local`.
5. Jalankan request `Auth > Login` atau `Auth > Register` untuk mengisi variable `token`.

## Base URL

```txt
http://localhost:5000/api/v1
```

Jalankan backend:

```bash
npm run dev
```

Test health:

```txt
GET {{base_url}}/health
```

Response sukses:

```json
{
  "message": "API healthy",
  "success": true
}
```

## Environment Postman

Buat environment:

```txt
base_url = http://localhost:5000/api/v1
token    = isi setelah login
```

Untuk endpoint yang butuh login, tambahkan header:

```txt
Authorization: Bearer {{token}}
Content-Type: application/json
```

## Auth

### Register

```txt
POST {{base_url}}/auth/register
```

Body:

```json
{
  "name": "Tirta Samara",
  "email": "tirta@example.com",
  "password": "password123"
}
```

Ambil token dari:

```txt
data.token
```

### Login

```txt
POST {{base_url}}/auth/login
```

Body:

```json
{
  "email": "tirta@example.com",
  "password": "password123"
}
```

### Login Google Dummy

Untuk simulasi Google login sebelum integrasi OAuth asli:

```txt
POST {{base_url}}/auth/google
```

Body:

```json
{
  "name": "Tirta Samara",
  "email": "tirta.google@example.com",
  "providerUserId": "google-user-id-123"
}
```

## Users

### Get Profile

```txt
GET {{base_url}}/users/me
```

Headers:

```txt
Authorization: Bearer {{token}}
```

### Update Profile

```txt
PATCH {{base_url}}/users/me
```

Body:

```json
{
  "name": "Tirta Updated",
  "password": "newpassword123"
}
```

## Movies

Endpoint `movies` dipakai untuk movie dan series. Pembeda datanya ada di field `type`.

### Get All Movies

```txt
GET {{base_url}}/movies
```

Query opsional:

```txt
page=1
take=20
type=movie
genre=drama
search=avatar
isTopTen=true
isTrending=true
isPremium=false
```

Contoh:

```txt
GET {{base_url}}/movies?page=1&take=10&type=movie
```

### Get Movie By ID

```txt
GET {{base_url}}/movies/1
```

### Create Movie

Butuh login admin.

```txt
POST {{base_url}}/movies
```

Body:

```json
{
  "slug": "avatar-the-way-of-water",
  "title": "Avatar: The Way of Water",
  "type": "movie",
  "description": "Jake Sully hidup bersama keluarga barunya di Pandora.",
  "image": "https://image.tmdb.org/t/p/w342/poster.jpg",
  "previewImage": "https://image.tmdb.org/t/p/w780/backdrop.jpg",
  "rating": 4.7,
  "ageRating": "13+",
  "badge": "Premium",
  "releaseYear": 2022,
  "isTopTen": true,
  "isActive": true,
  "isTrending": true,
  "isPremium": true,
  "trailerUrl": "https://www.youtube.com/embed/d9MyW72ELq0",
  "publishedAt": "2026-06-26T00:00:00.000Z"
}
```

### Create Series

```txt
POST {{base_url}}/movies
```

Body:

```json
{
  "slug": "ted-lasso",
  "title": "Ted Lasso",
  "type": "series",
  "description": "Pelatih sepak bola Amerika melatih klub sepak bola Inggris.",
  "image": "https://image.tmdb.org/t/p/w342/poster.jpg",
  "previewImage": "https://image.tmdb.org/t/p/w780/backdrop.jpg",
  "rating": 4.8,
  "ageRating": "16+",
  "badge": "Episode Baru",
  "releaseYear": 2020,
  "isTopTen": false,
  "isActive": true,
  "isTrending": true,
  "isPremium": false,
  "trailerUrl": "https://www.youtube.com/embed/3u7EIiohs6U",
  "publishedAt": "2026-06-26T00:00:00.000Z"
}
```

### Update Movie

Butuh login admin.

```txt
PATCH {{base_url}}/movies/1
```

Body bebas partial:

```json
{
  "title": "Avatar Updated",
  "isTrending": false
}
```

### Delete Movie

Butuh login admin.

```txt
DELETE {{base_url}}/movies/1
```

## Genres

### Get All Genres

```txt
GET {{base_url}}/genres
```

### Create Genre

Butuh login admin.

```txt
POST {{base_url}}/genres
```

Body:

```json
{
  "name": "Dokumenter",
  "slug": "dokumenter"
}
```

### Update Genre

```txt
PATCH {{base_url}}/genres/dokumenter
```

Body:

```json
{
  "name": "Documentary"
}
```

### Delete Genre

```txt
DELETE {{base_url}}/genres/dokumenter
```

## Episodes

### Get Episodes

```txt
GET {{base_url}}/episodes
```

Filter berdasarkan movie/series:

```txt
GET {{base_url}}/episodes?seriesFilmId=1
```

### Create Episode

Butuh login admin.

```txt
POST {{base_url}}/episodes
```

Body:

```json
{
  "seriesFilmId": 1,
  "title": "Pilot",
  "description": "Episode pertama.",
  "seasonNumber": 1,
  "episodeNumber": 1,
  "duration": "30 min",
  "videoUrl": "https://www.youtube.com/embed/example",
  "thumbnailUrl": "https://image.tmdb.org/t/p/w342/thumb.jpg"
}
```

### Update Episode

```txt
PATCH {{base_url}}/episodes/1
```

Body:

```json
{
  "duration": "33 min"
}
```

### Delete Episode

```txt
DELETE {{base_url}}/episodes/1
```

## My Lists

Semua endpoint butuh login.

### Get My List

```txt
GET {{base_url}}/my-lists
```

### Add To My List

```txt
POST {{base_url}}/my-lists
```

Body:

```json
{
  "seriesFilmId": 1
}
```

### Remove From My List

```txt
DELETE {{base_url}}/my-lists/1
```

`1` adalah `seriesFilmId`.

## Watch Progress

Semua endpoint butuh login.

### Get Watch Progress

```txt
GET {{base_url}}/watch-progress
```

### Save Watch Progress

```txt
POST {{base_url}}/watch-progress
```

Body untuk movie:

```json
{
  "seriesFilmId": 1,
  "progressPercent": 58,
  "lastPositionSeconds": 3480
}
```

Body untuk series:

```json
{
  "seriesFilmId": 2,
  "episodeMovieId": 1,
  "progressPercent": 35,
  "lastPositionSeconds": 900
}
```

## Packages

### Get Packages

```txt
GET {{base_url}}/packages
```

### Create Package

Butuh login admin.

```txt
POST {{base_url}}/packages
```

Body:

```json
{
  "name": "Individual",
  "price": 49000,
  "durationDays": 30,
  "quality": "720p",
  "maxDevices": 1,
  "isActive": true
}
```

### Update Package

```txt
PATCH {{base_url}}/packages/1
```

Body:

```json
{
  "price": 52000
}
```

### Delete Package

```txt
DELETE {{base_url}}/packages/1
```

## Orders

Semua endpoint butuh login.

### Get Orders

```txt
GET {{base_url}}/orders
```

### Get Order Detail

```txt
GET {{base_url}}/orders/1
```

### Create Order

```txt
POST {{base_url}}/orders
```

Body:

```json
{
  "packageId": 1
}
```

Flow ini membuat order dengan status `pending` dan `paymentExpiredAt` sekitar 15 menit.

## Payments

Semua endpoint butuh login.

### Get Payments

```txt
GET {{base_url}}/payments
```

### Create Payment

```txt
POST {{base_url}}/payments
```

Body:

```json
{
  "orderId": 1,
  "paymentMethod": "BCA Virtual Account",
  "paymentGateway": "BCA"
}
```

Response akan berisi `transactionId` sebagai kode pembayaran dummy.

### Mark Payment As Paid

```txt
PATCH {{base_url}}/payments/1/paid
```

Flow ini akan:

- update payment menjadi `paid`
- update order menjadi `paid`
- membuat subscription aktif

## Subscriptions

Semua endpoint butuh login.

### Get All Subscriptions

```txt
GET {{base_url}}/subscriptions
```

### Get Current Subscription

```txt
GET {{base_url}}/subscriptions/current
```

### Cancel Subscription

```txt
PATCH {{base_url}}/subscriptions/1/cancel
```

## Flow Test Utama

Urutan test yang paling enak:

1. `POST /auth/register`
2. Simpan `data.token` ke variable `token`
3. `GET /packages`
4. `POST /orders` dengan `packageId`
5. `POST /payments` dengan `orderId`
6. `PATCH /payments/:id/paid`
7. `GET /subscriptions/current`
8. `GET /users/me`

## Catatan Admin

Endpoint create/update/delete untuk data master butuh user role `ADMIN`.

Untuk sementara, ubah role user langsung dari database jika perlu testing admin:

```sql
UPDATE users SET role = 'admin' WHERE email = 'tirta@example.com';
```
