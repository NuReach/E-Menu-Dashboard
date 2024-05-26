'use client';
import { LucideIcon, LucideProps } from 'lucide-react'
import React from 'react'

type CardProps = {
    title: string;
    Icon: React.ReactNode;
    value: string;
  }

export default function Card( { title  , Icon , value  }  : CardProps ) {
  return (
    <div className=' p-6 border rounded-lg shadow-lg w-full lg:w-72'>
        <div className=' flex gap-3 justify-between'>
            <h3 className='font-bold text-lg'>{title}</h3>
            <div>{Icon}</div>
        </div>
        <div className='mt-3'> 
            <h1 className='font-bold text-3xl'>{value}</h1>
        </div>
    </div>
  )
}
