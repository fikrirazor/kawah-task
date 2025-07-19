# Kawah Task

## Tentang Proyek

Ini adalah monorepo untuk aplikasi Kawah Task, sebuah aplikasi daftar tugas lengkap yang terdiri dari layanan backend (API) dan antarmuka pengguna (frontend).

### Fitur Utama
* **Aplikasi Full-stack:** Backend dengan Express.js & MongoDB, Frontend dengan Next.js & React.
* **Authentication:** Berbasis JWT untuk keamanan pengguna.
* **Validasi & Error Handling:** Penanganan yang komprehensif di kedua sisi.
* **Kualitas Kode:** Menggunakan ESLint, Prettier, Husky, dan lint-staged untuk menjaga standar kode.
* **Dokumentasi API:** Interaktif dengan Swagger.

---

## Struktur Proyek

```
kawah-task/
├── kawah-task-frontend/ # Aplikasi frontend Next.js
└── kawah-task-backend/  # Layanan backend Express.js
```

---

## Memulai Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan seluruh aplikasi Kawah Task secara lokal.

### Prasyarat

* [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
* [npm](https://www.npmjs.com/) (biasanya terinstal dengan Node.js)
* [MongoDB](https://www.mongodb.com/try/download/community) (server database)

### Instalasi & Konfigurasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/fikrirazor/kawah-task.git
    cd kawah-task
    ```

2.  **Siapkan Backend (`kawah-task-backend`):**
    * Masuk ke direktori backend:
        ```bash
        cd kawah-task-backend
        ```
    * Instal dependensi:
        ```bash
        npm install
        ```
    * Buat file `.env` di direktori `kawah-task-backend` dengan konfigurasi berikut:
        ```env
        NODE_ENV=development
        PORT=3000
        MONGODB_URL=mongodb://localhost:27017/kawah-task-dev
        JWT_SECRET=your_jwt_secret_key_here # Ganti dengan string acak yang kuat
        ```
    * Kembali ke direktori root monorepo:
        ```bash
        cd ..
        ```

3.  **Siapkan Frontend (`kawah-task-frontend`):**
    * Masuk ke direktori frontend:
        ```bash
        cd kawah-task-frontend
        ```
    * Instal dependensi:
        ```bash
        npm install
        ```
    * Buat file `.env.local` di direktori `kawah-task-frontend` dengan konfigurasi berikut:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:3000/v1 # Sesuaikan jika port backend berbeda
        ```
    * Kembali ke direktori root monorepo:
        ```bash
        cd ..
        ```

### Menjalankan Aplikasi

1.  **Mulai MongoDB:**
    Pastikan server MongoDB Anda berjalan.

2.  **Mulai Backend:**
    * Dari direktori root `kawah-task`:
        ```bash
        cd kawah-task-backend
        npm run dev
        ```
    * Backend API akan tersedia di `http://localhost:3000`. Dokumentasi Swagger di `http://localhost:3000/v1/docs`.

3.  **Mulai Frontend:**
    * Buka terminal baru.
    * Dari direktori root `kawah-task`:
        ```bash
        cd kawah-task-frontend
        npm run dev
        ```
    * Aplikasi frontend akan tersedia di `http://localhost:3000`.

---

## Kawah Task Frontend

### Fitur Utama
* **Next.js 15:** Menggunakan versi terbaru dari kerangka kerja React yang powerful.
* **TypeScript:** Meningkatkan kualitas kode dan mencegah bug dengan pengetikan statis.
* **Tailwind CSS:** Untuk styling yang cepat dan efisien.
* **ESLint & Prettier:** Memastikan kode bersih, konsisten, dan terformat dengan rapi.
* **Husky & Lint-staged:** Menjalankan linter dan formatter secara otomatis sebelum setiap commit.
* **Axios:** Klien HTTP untuk interaksi dengan API.

### Skrip yang Tersedia

Berikut adalah daftar skrip yang dapat Anda gunakan di proyek ini (dari direktori `kawah-task-frontend`):

* `npm run dev`
    Menjalankan aplikasi dalam mode pengembangan. Fast Refresh akan aktif.
* `npm run build`
    Membangun aplikasi untuk produksi ke dalam folder `.next`.
* `npm run start`
    Menjalankan aplikasi yang sudah di-build dalam mode produksi.
* `npm run lint`
    Menjalankan ESLint untuk memeriksa masalah kode.
* `npm run lint:fix`
    Menjalankan ESLint dan secara otomatis memperbaiki masalah yang bisa diperbaiki.
* `npm run prettier`
    Memeriksa format kode menggunakan Prettier.
* `npm run prettier:fix`
    Secara otomatis memformat kode menggunakan Prettier.

### Kualitas Kode

Proyek ini menggunakan **Husky** dan **lint-staged** untuk menegakkan standar kualitas kode. Setiap kali Anda melakukan `git commit`, skrip berikut akan berjalan secara otomatis pada file yang diubah:
* `next lint --fix`
* `prettier --write`

Hal ini memastikan bahwa semua kode yang di-commit bersih, konsisten, dan bebas dari masalah umum.

---

## Kawah Task Backend

### Overview
A RESTful API for managing tasks and users with authentication, featuring:
- JWT-based authentication
- CRUD operations for tasks
- User registration & management
- Role-based access control
- Swagger API documentation
- Comprehensive validation & error handling

### Project Structure
```
src/
├── config/ # Configuration files (JWT, roles, logging)
├── controllers/ # API endpoint handlers
├── docs/ # Swagger API documentation
├── middlewares/ # Auth, validation, error handling
├── models/ # MongoDB schema definitions
├── routes/ # API route definitions (v1)
├── services/ # Business logic layer
├── utils/ # Utility functions (ApiError, catchAsync)
├── validations/ # Request validation schemas
├── app.js # Express app setup
└── index.js # Server entry point
```

### Technologies Used

-   **Node.js** with **Express.js**
-   **MongoDB** via **Mongoose** ORM
-   **JWT** for authentication
-   **Swagger** for API documentation
-   **Joi** for request validation
-   **Morgan** for logging
-   **Jest** for testing

### Testing
Run tests with:
```bash
npm test
```

### Deployment
Using Docker
```bash
# Development
docker-compose up -d
# Production
docker-compose -f docker-compose.prod.yml up -d
```

### Security
Rate limiting with Redis
Input validation via Joi
JWT token refresh mechanism
Password hashing with bcrypt

### Monitoring
Access logs through:
```bash
tail -f logs/app.log
```

### Contributing
Contributions are welcome! Please follow:
Fork the repository
Create a new branch
Submit a pull request

---

## Lisensi

Proyek ini berada di bawah lisensi [Nama Lisensi] - lihat file [LICENSE.md](LICENSE.md) untuk detail lebih lanjut.