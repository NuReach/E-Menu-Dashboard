"use server";
import { currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";

export async function createProductAction(formData:FormData) {
    const values = Object.fromEntries(formData.entries());
    const user = await currentUser();
    console.log(values);

} 

export async function uploadImage(formData: FormData): Promise<string> {
    const image = formData.get("image") as File;
    const {url} = await put(`products/${image.name}`, image, {
      access: "public",
    });
    return url;
  }