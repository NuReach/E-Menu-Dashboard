"use client";
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog';
import { Trash } from 'lucide-react';
import { deleteItemAction } from '@/app/dashboard/products/action';
import { toast } from './use-toast';

function DeleteItemBtn({title,itemId}:propTypes) {
  return (
    <div>
        <AlertDialog>
                <AlertDialogTrigger><Trash /></AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>{
                        try {
                            toast({
                                title: "Succesfully❤✨",
                                description: "Product is Deleted.",
                              })    
                            deleteItemAction(title,itemId);
                        } catch (error) {
                            console.log(error);      
                        }
                        }}className="bg-red-600 hover:bg-red-500">Continue</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}
 
interface propTypes  {
    title : string,
    itemId : number
}
export default DeleteItemBtn;
