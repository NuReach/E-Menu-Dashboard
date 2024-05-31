"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductAction(formData:FormData) {
    const values = Object.fromEntries(formData.entries());
    const user = await currentUser();
    await prisma.product.create({
      data: {
        name : String(values.name),
        description : String(values.description),
        cost : Number(values.cost),
        discount : Number(values.discount),
        price : Number(values.price),
        sku : String(values.sku),
        status : Boolean(values.status),
        imageUrl : String(values.image),
        tag : String(values.tag),
        category : String(values.category),
        userId : String(user?.id)
      }
    })
    redirect(`/dashboard`);
    revalidatePath(`/dashboard`);
} 

export async function uploadImage(formData: FormData): Promise<string> {
    const image = formData.get("image") as File;
    const {url} = await put(`products/${image.name}`, image, {
      access: "public",
    });
    return url;
  }