// /src/app/login/page.tsx
"use client";
import Image from "next/image";
import LoginForm from "../../components/account/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl lg:h-[550px] grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Logo */}
        <div className="flex items-center justify-center p-6 ">
          <Image src="/logo.svg" alt="Logo" width={300} height={300} />
        </div>

        {/* Form Login */}
        <div className="p-10 sm:p-16 flex flex-col justify-center bg-white">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
