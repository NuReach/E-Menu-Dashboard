import Navbar from '@/components/ui/Navbar'
import { auth } from '@clerk/nextjs/server';
import { redirect, useParams } from 'next/navigation';
import React from 'react'
import prisma from '@/lib/prisma';
import UpdateProductForm from './UpdateProductForm';
import { Product } from '@prisma/client';

interface PageProps {
    params: { id: number };
  }

export default async function Page( { params : {id}  } : PageProps ) {

    const isAuth = auth();
    if(!isAuth){
      redirect('/');
    }
    const product = await prisma.product.findUnique({
        where : {
            id : Number(id)
        }
    }) as Product ;

  return (
    <div>
        <Navbar />
        <div className='p-3 flex flex-col w-full justify-center items-center mb-9'>
          <div className='w-full md:w-1/2'>
            <h1 className='font-bold text-3xl mb-6'>Update Product</h1>
            <UpdateProductForm product = {product} />
          </div>
        </div>
    </div>
  )
}
