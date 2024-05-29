import Card from '@/components/ui/Card'
import { BadgeDollarSign, Bolt, Layers3, PackageSearch } from 'lucide-react'
import React from 'react'

export default function SideCard() {
  return (
    <div className='columns-1 sm:columns-2 lg:columns-1 space-y-9'>
    <Card title='Products' Icon={<PackageSearch />} value='+15' />
    <Card title='Categories' Icon={<Layers3 />} value='+5' />
    <Card title='Status' Icon={<Bolt />} value='+3' />
    <Card title='Promotions' Icon={<BadgeDollarSign />} value='+1' />
  </div>
  )
}
