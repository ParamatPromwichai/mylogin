// app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // สั่งให้เปลี่ยนหน้าไปที่ /login ทันที
  redirect('/login');
}