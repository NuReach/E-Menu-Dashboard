import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

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

    const products = await prisma.product.findMany({
      take: perPage,
      skip,
    });

    const totalCount = await prisma.user.count(); 
    return NextResponse.json({ products, totalCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        const { name, description, price, cost, status, discount, sku, userId } = body;

        if (!name || price == null || cost == null || !sku || userId == null) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                cost,
                status: status != null ? status : true,
                discount: discount != null ? discount : 0.0,
                sku,
                userId,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}