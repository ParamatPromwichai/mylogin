
'use client';
import { useEffect } from "react";



export default function DashboardPage() {
  useEffect(() => {
    // ตรวจสอบว่าผู้ใช้ได้ล็อกอินแล้วหรือไม่
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>ยินดีต้อนรับสู่หน้า Dashboard!</p>
    </div>
  );
}