import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest , context : any): Promise<NextResponse> {
    const { params } = context;
    const { product_id } = params;

    // Authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    if (!await verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(product_id, 10),
            },
        });

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error('Error getting product by ID:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: any): Promise<NextResponse> {
    const { params } = context;
    const { product_id } = params;
    const body = await request.json();

    // Authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    if (!await verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const productIdNumber = parseInt(product_id, 10);
        if (isNaN(productIdNumber)) {
            return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
        }

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: productIdNumber,
            },
        });

        if (!existingProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        const { name, description, price, cost, status, discount, sku, userId } = body;
        
        if (sku) {
            const skuConflict = await prisma.product.findUnique({
                where: {
                    sku: sku,
                },
            });

            if (skuConflict && skuConflict.id !== productIdNumber) {
                return NextResponse.json({ message: 'SKU already exists' }, { status: 409 });
            }
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: productIdNumber,
            },
            data: {
                name: name !== undefined ? name : existingProduct.name,
                description: description !== undefined ? description : existingProduct.description,
                price: price !== undefined ? price : existingProduct.price,
                cost: cost !== undefined ? cost : existingProduct.cost,
                status: status !== undefined ? status : existingProduct.status,
                discount: discount !== undefined ? discount : existingProduct.discount,
                sku: sku !== undefined ? sku : existingProduct.sku,
                userId: userId !== undefined ? userId : existingProduct.userId,
            },
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: any): Promise<NextResponse> {
    const { params } = context;
    const { product_id } = params;

    // Authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    if (!await verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const productIdNumber = parseInt(product_id, 10);
        if (isNaN(productIdNumber)) {
            return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
        }

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: productIdNumber,
            },
        });

        if (!existingProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        await prisma.product.delete({
            where: {
                id: productIdNumber,
            },
        });

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}