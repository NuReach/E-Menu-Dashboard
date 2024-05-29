import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(3).max(50),
    
  })

export default function ProductCreatePage() {
  return (
    <div>
        <Navbar />
    </div>
  )
}
