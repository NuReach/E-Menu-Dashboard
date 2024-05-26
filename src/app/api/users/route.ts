import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import {  hashPassword, verifyToken } from '@/lib/utils';
import prisma from '@/lib/prisma';


export async function GET(request: NextRequest): Promise<NextResponse> {
    
    try {

    //Authentication
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!await verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    const user = await verifyToken(token);
    
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const perPage = parseInt(url.searchParams.get('perPage') || '10', 10);

    const skip = (page - 1) * perPage;

    const users = await prisma.user.findMany({
      take: perPage,
      skip,
    });

    const totalCount = await prisma.user.count(); 
    return NextResponse.json({ users, totalCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {

    if (request.method !== 'POST') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    //Authentication
    // const authHeader = request.headers.get('authorization');

    // if (!authHeader) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }
    
    // const token = authHeader.split(' ')[1];
    
    // if (!await verifyToken(token)) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }
  
    // const user = await verifyToken(token);


    try {
      const body = await request.json();

      if (!body.name || !body.password) {
        return NextResponse.json({ message: 'Name and password are required' }, { status: 400 });
      }
  
      const hashedPassword = await hashPassword(body.password); // Hash password before storing
  
      const user = await prisma.user.create({
        data: {
          name: body.name,
          password: hashedPassword, 
        },
      });
      return NextResponse.json(user, { status: 201 }); 
    } catch (error) {
      console.error(error);
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      } else {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }
    }
  }