"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProductAction(formData:FormData,productId:number) {
    const values = Object.fromEntries(formData.entries());
    const user = await currentUser();
    const existingProduct = await prisma.product.findUnique({
      where: {
          id: productId,
      },
  });

  if (!existingProduct) {
      throw new Error("Product not found");
  }

  const updatedProduct = await prisma.product.update({
      where: {
          id: productId,
      },
      data: {
          name: String(values.name),
          description: String(values.description),
          cost: Number(values.cost),
          discount: Number(values.discount),
          price: Number(values.price),
          sku: String(values.sku),
          status: Boolean(values.status),
          imageUrl: String(values.image),
          tag: String(values.tag),
          category: String(values.category),
          userId: String(user?.id),
      },
  });

    redirect(`/dashboard`);
    revalidatePath(`/dashboard`);
} 
