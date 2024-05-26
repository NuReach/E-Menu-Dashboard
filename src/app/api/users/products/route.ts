import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest): Promise<NextResponse> {
    // Authentication
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    const user = await verifyToken(token);
    
    const userId = user?.userId;

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                userId,
            },
        });

        if (products.length === 0) {
            return NextResponse.json({ message: 'No products found for this user' }, { status: 404 });
        }

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error('Error getting products for user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}