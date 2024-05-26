import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest , context : any): Promise<NextResponse> {
    const { params } = context;
    const { user_id } = params;

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
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(user_id,10),
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error; 
    }
}

export async function PUT(request: NextRequest, context: any): Promise<NextResponse> {
    
    const { params } = context;
    const { user_id } = params;
    const body = await request.json();

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

    try {
        const userIdNumber = parseInt(user_id, 10);
        if (isNaN(userIdNumber)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userIdNumber,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const { name, password } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: userIdNumber,
            },
            data: {
                name,
                password: password ? password : user.password,
            },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: any): Promise<NextResponse> {
    const { params } = context;
    const { user_id } = params;
    
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!await verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await verifyToken(token);

    try {
        const userIdNumber = parseInt(user_id, 10);
        if (isNaN(userIdNumber)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userIdNumber,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        await prisma.user.delete({
            where: {
                id: userIdNumber,
            },
        });

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}