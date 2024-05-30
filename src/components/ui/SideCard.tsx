import Card from '@/components/ui/Card'
import prisma from '@/lib/prisma';
import { BadgeDollarSign, Bolt, Layers3, PackageSearch } from 'lucide-react'
import React from 'react'

export default async function SideCard() {
  
  const categoryGroup = await prisma.product.groupBy({
    by: 'category',
    _count: {
      category: true
    }
  })

  const products = await prisma.product.findMany();

  const tagGroup = await prisma.product.groupBy({
    by: 'tag',
    _count: {
      tag: true
    }
  })

  const promotionProducts = await prisma.product.findMany({
    where : {
      discount : {
        gt : 0
      }
    }
  })


  
  return (
    <div className='columns-1 sm:columns-2 lg:columns-1 space-y-9'>
    <Card title='Products' Icon={<PackageSearch />} value={`+${products.length}`} />
    <Card title='Categories' Icon={<Layers3 />} value={`+${categoryGroup.length}`} />
    <Card title='Tags' Icon={<Bolt />} value={`+${tagGroup.length}`} />
    <Card title='Promotions' Icon={<BadgeDollarSign />} value={`+${promotionProducts.length}`} />
  </div>
  )
}
