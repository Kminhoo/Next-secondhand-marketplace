'use client'

import React, { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const LoginPage = () => {

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)

    try {
      const data = await signIn('credentials', body)
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='grid h-[calc(100vh_-_56px)] place-items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center gap-4 min-w-[350px]'
      >

        <h1 className='text-2xl'>
          Login
        </h1>

        <Input
          id='email'
          label='email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id='password'
          label='password'
          type='password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Button 
          label='로그인하기'
        />

        <div className='text-center'>
          <p className='text-gray-400'>
            Not a member?{" "}
            <Link 
              href='/auth/register' 
              className='text-black hover:underline'
            >
              Move to Register
            </Link>
          </p>
        </div>

      </form>
    </section>
  )
}

export default LoginPage