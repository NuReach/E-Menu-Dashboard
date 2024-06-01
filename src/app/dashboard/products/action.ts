'use server';
import { toast } from "@/components/ui/use-toast";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteItemAction(title:string,itemId:number,imageUrl:string|null) {
    if (title=="product") {
        if (imageUrl!=="" && imageUrl !== null && imageUrl !== "undefined") {
            console.log(imageUrl);
            await del(imageUrl);
            await prisma.product.delete({
                where: {
                    id: itemId,
                },
            }); 
            revalidatePath('/dashboard');        
        }
        await prisma.product.delete({
            where: {
                id: itemId,
            },
        });  
        revalidatePath('/dashboard');        
    }
}
