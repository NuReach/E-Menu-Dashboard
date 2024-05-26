import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest , context : any): Promise<NextResponse> {
    const { params } = context;
    const { name } = params;
    
    try {


        const user = await prisma.user.findUnique({
            where: {
                name,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const userId = user?.id;

        const products = await prisma.product.findMany({
            where: {
                userId:userId,
            },
        });

        return NextResponse.json({products,user}, { status: 200 });
    } catch (error) {
        console.error('Error getting user by ID:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
