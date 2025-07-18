// src/app/page.tsx
'use client'; // Tandai sebagai Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth'; // Sesuaikan path jika berbeda

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Ambil user dan status loading dari useAuth

  useEffect(() => {
    // Jalankan logika redirect setelah useAuth selesai memuat status otentikasi
    if (!authLoading) {
      if (user) {
        // Jika user ada (sudah login), redirect ke halaman tasks
        router.push('/tasks');
      } else {
        // Jika user tidak ada (belum login), redirect ke halaman login
        router.push('/login');
      }
    }
  }, [authLoading, user, router]); // Dependencies: authLoading, user, dan router

  // Tampilkan loading state sementara menunggu status otentikasi
  // Ini penting untuk mencegah flickering konten default Next.js sebelum redirect
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <p className="text-lg">Loading authentication status...</p>
    </div>
  );
}