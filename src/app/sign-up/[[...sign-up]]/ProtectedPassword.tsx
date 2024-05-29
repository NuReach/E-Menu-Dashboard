'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignUp } from '@clerk/nextjs';
import React, { useState } from 'react'

export default function ProtectedPassword() {
  const [secret , setSecret] = useState("33339999");   
  const [password , setPassword] = useState(""); 
  return (
    <div>
        {
            password !== secret &&
            <div className=' flex justify-center items-center flex-wrap gap-3'>
                <Input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'  />
            </div>
        }
        {
            password === secret &&
            <SignUp />
        }
    </div>
  )
}
