# Kawah Task Frontend

## Tentang Proyek

Ini adalah aplikasi frontend yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS. Proyek ini merupakan bagian dari **Kawah Task**, yang bertujuan untuk menyediakan antarmuka modern dan responsif untuk mengelola tugas atau data lainnya.

### Fitur Utama
* **Next.js 15:** Menggunakan versi terbaru dari kerangka kerja React yang powerful.
* **TypeScript:** Meningkatkan kualitas kode dan mencegah bug dengan pengetikan statis.
* **Tailwind CSS:** Untuk styling yang cepat dan efisien.
* **ESLint & Prettier:** Memastikan kode bersih, konsisten, dan terformat dengan rapi.
* **Husky & Lint-staged:** Menjalankan linter dan formatter secara otomatis sebelum setiap commit.
* **Axios:** Klien HTTP untuk interaksi dengan API.

---

## Memulai Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal.

### Prasyarat

Pastikan Anda memiliki [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru) dan npm terinstal.

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/fikrirazor/kawah-task.git
    cd kawah-task
    cd kawah-task-frontend
    ```
2.  **Instal dependensi:**
    ```bash
    npm install 
    ```
3.  **Siapkan variabel lingkungan:**
    Buat file `.env.local` di root proyek. Tambahkan variabel lingkungan yang dibutuhkan, misalnya URL API. Lihat .env.local.example untuk contoh.
    ```bash
    NEXT_PUBLIC_API_URL=https://api.example.com
    ```

### Menjalankan Aplikasi

Jalankan server pengembangan:
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:3000`.

---

## Skrip yang Tersedia

Berikut adalah daftar skrip yang dapat Anda gunakan di proyek ini:

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

---

## Kualitas Kode

Proyek ini menggunakan **Husky** dan **lint-staged** untuk menegakkan standar kualitas kode. Setiap kali Anda melakukan `git commit`, skrip berikut akan berjalan secara otomatis pada file yang diubah:
* `next lint --fix`
* `prettier --write`

Hal ini memastikan bahwa semua kode yang di-commit bersih, konsisten, dan bebas dari masalah umum.

---

## Lisensi

Proyek ini berada di bawah lisensi [Nama Lisensi] - lihat file [LICENSE.md](LICENSE.md) untuk detail lebih lanjut.