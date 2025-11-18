'use client'

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from 'next/link'
import {useDebounceValue}  from "usehooks-ts"
import { Loader2 } from 'lucide-react';


import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import axios,{AxiosError} from "axios"
import { ApiResponse } from '@/types/ApiResponse'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signInSchema } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'

const page = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)


 const router = useRouter()

 // Zod implementation

 const form = useForm<z.infer<typeof signInSchema>>({
  resolver:zodResolver(signInSchema),
  defaultValues:{
    identifier:"",
    password:""
  }
 })

 

 const onSubmit = async(data:z.infer<typeof signInSchema>)=>{
    const result =  await signIn('credentials',{
        redirect:false,
        identifier:data.identifier,
        password:data.password
    })
    console.log(result);
    
    if (result?.error) {
        if (result.error.includes("verify")) {
                toast.error("Please verify your account before signing in")
            } else if (result.error.includes("Invalid password")) {
                toast.error("Invalid password")
            } else if (result.error.includes("No user found")) {
                toast.error("No account found with this email or username")
            } else {
                toast.error("Login failed: " + result.error)
            }
            return
        
    }

    if (result?.url) {
        toast.success("Login success")
        // router.replace("/dashboard")
    }
 }
  
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-800'>
       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
         <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Darama
          </h1>
          <p className="mb-4">Sign up to start your Rating</p>
        </div>

        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
              

            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/username</FormLabel>
                  <Input {...field} placeholder='email/username' />
                  <p className='text-gray-400 text-sm'>We will send you a verification code</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' >
              {
                
                <>
                  Sign in
                  </>
               
                
              }
            </Button>
          </form>
        </Form>
         <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
       </div>
    </div>
  )
}

export default page