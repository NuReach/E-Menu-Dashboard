import Card from '@/components/ui/Card'
import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { BadgeDollarSign, Bolt, Layers3, PackageSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Table from '@/components/ui/Table'

export default function Dashboard() {
  const deletePostMutation = ()=>{

  }
  return (
    <div>
        <Navbar />
        <div className='p-6 w-full flex flex-col lg:flex-row '>
          <div className='columns-1 sm:columns-2 lg:columns-1 space-y-9'>
            <Card title='Products' Icon={<PackageSearch />} value='+15' />
            <Card title='Categories' Icon={<Layers3 />} value='+5' />
            <Card title='Status' Icon={<Bolt />} value='+3' />
            <Card title='Promotions' Icon={<BadgeDollarSign />} value='+1' />
          </div>
          <div className='w-full p-3'>
            <div className='flex justify-between'>
              <h3 className='font-bold text-3xl'>Dashboard</h3>
              <Button>ADD</Button>
            </div>
            <div>
              <Table courses={[]} deletePostMutation={deletePostMutation} />
            </div>
          </div>
        </div>
    </div>
  )
}
