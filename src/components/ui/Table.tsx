import { Edit, Trash } from 'lucide-react';
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { ScrollArea } from './scroll-area';
import Link from 'next/link';
import DeleteItemBtn from './DeleteItemBtn';


const Table = async () => {
  const user = await currentUser();
  const products = await prisma.product.findMany({
    where : {
      userId : user?.id
    },
    orderBy : {
      createdAt : 'desc'
    }
  });
  return (
    <div>
      <ScrollArea className=' p-3  sm:p-6 border shadow-lg rounded-lg mt-6 h-[530px] '>
        <div className='flex font-bold text-xs md:text-sm cursor-pointer justify-between gap-3 border-b pb-3'>
          <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>ID</div>
          <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Name</div>
          <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden xl:block'>Category</div>
          <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Price</div>
          <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Discount</div>
          <div className='flex justify-center w-20'>Action</div>
        </div>
        <div className='mt-6 gap-6 capitalize flex flex-col'>
          {
            products?.length == 0 && <div className='h-96 w-full flex justify-center items-center font-bold'>No Items</div>
          }
          {products?.map((item, i) => (
            <div key={i} className='flex text-sm justify-between gap-3 items-center'>
              <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>{i + 1}</div>
              <div className='w-36'>{item.name}</div>
              <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.category}</div>
              <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>${item.price}</div>
              <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.discount}%</div>
              <div className='flex justify-center w-20 gap-1'>
                <Link href={`/dashboard/products/${item.id}`}>
                  <Edit />
                </Link>
               <DeleteItemBtn itemId={item.id} title={"product"} imageUrl={item.imageUrl} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Table;
