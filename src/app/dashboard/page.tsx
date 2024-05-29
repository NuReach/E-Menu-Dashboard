import Card from '@/components/ui/Card'
import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { BadgeDollarSign, Bolt, Layers3, PackageSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Table from '@/components/ui/Table'
import SideCard from '../../components/ui/SideCard'
import Link from 'next/link'

export default function Dashboard() {
  const deletePostMutation = ()=>{

  }
  return (
    <div>
        <Navbar />
        <div className='p-6 w-full flex flex-col lg:flex-row '>
          <SideCard />
          <div className='w-full p-3'>
            <div className='flex justify-between'>
              <h3 className='font-bold text-3xl'>Dashboard</h3>
              <Link href={`/dashboard/products/create`}>
                <Button>ADD</Button>
              </Link>
            </div>
            <div>
              <Table courses={[]} deletePostMutation={deletePostMutation} />
            </div>
          </div>
        </div>
    </div>
  )
}
