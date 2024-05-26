import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { SquareMenu } from "lucide-react"


export default function Navbar() {
  return (
    <div className='p-3 border-b shadow flex justify-between items-center'>
        <Link className='flex gap-3 items-center' href={'/dashboard'}>
            <SquareMenu />
            <h1 className='font-bold text-xl'>E-Admin</h1>
        </Link>
        <div className='flex space-x-3'>
            <Button>Logout</Button>
        </div>
    </div>
  )
}
