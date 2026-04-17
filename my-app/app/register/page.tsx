// app/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link'; // เผื่อเอาไว้ทำลิงก์กลับไปหน้า Login

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ ' + data.message + ' (สามารถไปหน้า Login ได้เลย)');
        // ล้างฟอร์มเมื่อสมัครสำเร็จ
        setEmail('');
        setPassword('');
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>สมัครสมาชิก</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            minLength={6} // บังคับรหัสผ่านขั้นต่ำ 6 ตัวอักษร
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '10px', 
            background: isLoading ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: isLoading ? 'not-allowed' : 'pointer' 
          }}
        >
          {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
        </button>
      </form>
      
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        มีบัญชีอยู่แล้ว? <Link href="/login" style={{ color: '#0070f3' }}>เข้าสู่ระบบที่นี่</Link>
      </div>
    </div>
  );
}