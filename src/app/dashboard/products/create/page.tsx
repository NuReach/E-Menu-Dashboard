import Navbar from '@/components/ui/Navbar'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import CreateProductForm from './CreateProductForm';


export default async function ProductCreatePage() {
  const isAuth = auth();
  if(!isAuth){
    redirect('/');
  }

  return (
    <div>
        <Navbar />
        <div className='p-3 flex flex-col w-full justify-center items-center mb-9'>
          <div className='w-full md:w-1/2'>
            <h1 className='font-bold text-3xl mb-6'>Create Product</h1>
            <CreateProductForm  />
          </div>
        </div>
    </div>
  )
}
