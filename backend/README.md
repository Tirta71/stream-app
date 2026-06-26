# Backend CHILL App

Backend Express + MySQL + Prisma untuk CHILL App.

Dokumentasi test Postman ada di:

```txt
docs/postman.md
docs/CHILL_API.postman_collection.json
docs/CHILL_API.postman_environment.json
```

## Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

Salin `.env.example` menjadi `.env`, lalu sesuaikan `DATABASE_URL`.
