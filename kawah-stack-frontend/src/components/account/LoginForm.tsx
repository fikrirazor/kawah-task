// LoginForm.tsx
import { useState } from "react";
import Link from "next/link";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleEmailSubmit = () => {
    if (email) {
      setStep(2);
    }
  };

  return (
    <form className="space-y-6">
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
            >
              Login
            </button>
          </div>
        </div>
      )}
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
