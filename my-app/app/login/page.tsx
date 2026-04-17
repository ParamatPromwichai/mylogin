// app/login/page.tsx
'use client'; // ต้องใส่เพราะมีการใช้ State และ Events ในฝั่ง Client

import { link } from 'fs';
import Link from 'next/dist/client/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('กำลังตรวจสอบ...');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ ' + data.message);
        // เลี้ยวไปหน้า Dashboard หรือบันทึกข้อมูลการล็อกอินลง LocalStorage/State ได้ที่นี่
        window.location.href = '/dashboard'; // ตัวอย่างการเปลี่ยนหน้า
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>เข้าสู่ระบบ</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>อีเมล:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div>
          <label>รหัสผ่าน:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        ยังไม่มีบัญชี? <Link href="/register" style={{ color: '#0070f3' }}>สมัครสมาชิกที่นี่</Link>
      </div>
      </form>
      
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}