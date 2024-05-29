import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { SquareMenu } from "lucide-react"
import { auth, currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'

export default async function Navbar() {
  const isAuth = auth();
  const user = await currentUser();
 
  return (
    <div className='p-3 border-b shadow flex justify-between items-center'>
        <Link className='flex gap-3 items-center' href={'/dashboard'}>
            <SquareMenu />
            <h1 className='font-bold text-xl'>E-Admin</h1>
        </Link>
        {
          isAuth && 
          <div className='flex space-x-3 items-center'>
            <UserButton />
            <h1 className='font-bold capitalize'>{user?.username}</h1>
          </div>

        }
    </div>
  )
}
