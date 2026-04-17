// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
    }
    

    // Prisma ช่วยตรวจสอบความซ้ำซ้อนได้ง่ายๆ
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'อีเมลนี้ถูกใช้งานแล้ว' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลด้วย Prisma
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'สมัครสมาชิกสำเร็จ' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' }, { status: 500 });
  }
}