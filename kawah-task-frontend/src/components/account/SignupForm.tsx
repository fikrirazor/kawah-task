// SignupForm.tsx
"use client"; // Pastikan ini ada jika menggunakan komponen client di App Router
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth"; // Import useAuth
import { useRouter } from "next/navigation"; // Import useRouter

export default function SignupForm() {
  const router = useRouter(); // Inisialisasi useRouter
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Ambil register, loading, dan error dari useAuth
  const { register, loading, error } = useAuth(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error sebelum mencoba register
    // setError(""); // Tidak perlu karena useAuth sudah reset error

    if (password !== confirmPassword) {
      // Set error lokal jika password tidak cocok
      // Ini adalah error validasi form, bukan error API
      // Anda bisa menggunakan state error lokal atau membiarkan useAuth menangani
      // Untuk konsistensi, kita akan menggunakan error dari useAuth
      // atau menambahkan state error lokal di sini jika validasi form lebih kompleks.
      // Untuk saat ini, kita akan melempar error agar ditangkap oleh catch block.
      // Atau, lebih baik, gunakan state error lokal untuk validasi form.
      // Mari kita tambahkan state error lokal untuk validasi password.
      alert("Passwords do not match"); // Gunakan alert sementara atau modal kustom
      return;
    }

    try {
      await register(name, email, password); // Panggil fungsi register dari useAuth
      router.push("/login"); // Redirect setelah registrasi berhasil
    } catch (err) {
      // Error sudah ditangani di useAuth dan disimpan di state 'error' useAuth
      // Anda bisa log di sini jika perlu, tapi tidak perlu set error lagi
      console.error("Registration form submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
        />
        <label className="absolute left-1 top-2 text-gray-500 text-sm">
          Full Name
        </label>
      </div>

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
        />
        <label className="absolute left-1 top-2 text-gray-500 text-sm">
          Email address
        </label>
      </div>

      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
        />
        <label className="absolute left-1 top-2 text-gray-500 text-sm">
          Password
        </label>
      </div>

      <div className="relative mb-6">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
        />
        <label className="absolute left-1 top-2 text-gray-500 text-sm">
          Confirm Password
        </label>
      </div>

      {/* Tampilkan error dari useAuth */}
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <button
        type="submit"
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
        disabled={loading} // Nonaktifkan tombol saat loading
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </form>
  );
}