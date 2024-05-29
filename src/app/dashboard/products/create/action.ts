"use server";
import { currentUser } from "@clerk/nextjs/server";

interface CreateProductInterface {
    name: string,
    description: string ,
    price: number,
    cost: number,
    status: boolean,
    tag: string,
    discount: number,
    sku: string,
    imageUrl: string,
    category: string,
    userId :  string,
}

export async function createProductAction(formData:FormData) {
    const values = Object.fromEntries(formData.entries());
    const user = await currentUser();
    
} 