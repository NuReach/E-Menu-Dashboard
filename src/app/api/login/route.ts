import { NextRequest, NextResponse } from 'next/server';
import { generateToken, verifyPassword } from '@/lib/utils'; 
import prisma from '@/lib/prisma';



export async function POST(request: NextRequest): Promise<NextResponse> {

  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const body = await request.json(); 

  if (!body.name || !body.password) {
    return NextResponse.json({ message: 'Name and password are required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: body.name },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await verifyPassword(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user.id);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

