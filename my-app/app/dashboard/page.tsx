'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>ยินดีต้อนรับสู่หน้า Dashboard!</p>
      <button
        onClick={() => {
          localStorage.removeItem('token');
            router.push('/login');
        }}
        style={{ marginTop: '20px', padding: '10px 20px' }}
      >
        Logout
      </button>
    </div>
  );
}