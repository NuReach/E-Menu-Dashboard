'use server';
import { toast } from "@/components/ui/use-toast";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteItemAction(title:string,itemId:number) {
    if (title=="product") {
        await prisma.product.delete({
            where: {
                id: itemId,
            },
        });  
        revalidatePath('/dashboard');        
    }
}
