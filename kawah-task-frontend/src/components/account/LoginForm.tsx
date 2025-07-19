// src/components/account/LoginForm.tsx
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth"; // Import useAuth
import { useRouter } from "next/navigation";
// Hapus import apiClient karena akan menggunakan useAuth
// import apiClient from "@/services/apiClientWithAuth"; 

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const { login, loading, error } = useAuth(); // Ambil fungsi login dari useAuth

  const handleEmailSubmit = () => {
    if (email) setStep(2);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Panggil fungsi login dari useAuth
      await login(email, password); 
      router.push('/tasks'); // Redirect setelah login berhasil
    } catch (err) {
      // Error sudah ditangani di useAuth, tapi Anda bisa tambahkan log di sini jika perlu
      console.error("Login form submission error:", err);
    }
  };

  return (
    <form className="space-y-6" onSubmit={step === 2 ? handleLoginSubmit : undefined}>
      {step === 1 && (
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
            placeholder=" Email address "
          />
          <label
            htmlFor="email"
            className="absolute left-1 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
          >
            Email address
          </label>
          <div className="flex items-center justify-between text-sm mt-6">
            <button
              onClick={handleEmailSubmit}
              type="button"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
              disabled={loading}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-1 top-2 text-gray-500 text-sm transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Back to Email
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition duration-300 shadow-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      )}
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      <div className="mt-4 text-center">
        <p>
          Belum punya akun?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </form>
  );
}