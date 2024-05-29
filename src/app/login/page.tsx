import SigninForm from '@/components/SigninForm'
import React from 'react'

export default function SignIn() {
  return (
    <div className='w-full justify-center items-center flex h-screen p-2'>
        <div className='p-9 border-b shadow-lg rounded-lg border-2'>
          <div>
              <h1 className='font-bold text-3xl'>Sign In</h1>
              <p>Welcome Back To Admin Page!!</p>
          </div>
          <div className='mt-6 sm:w-80'>
            <SigninForm />
          </div>
      </div>
    </div>
  )
}
