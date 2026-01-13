"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { Nav } from './nav'
import Link from 'next/link'


export  function NavAndBtn() {


    const { data: session } = useSession()

    const user = session?.user
    return (
        <div className="flex justify-between items-center">
            <Nav />
            
            <Link href={'/sign-in'}>
            <button className='p-2 border-2 bg-amber-50'>{user ? user.username : "Not sign in"}</button>
            </Link>
        </div>
    )
}

