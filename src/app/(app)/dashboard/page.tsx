'use client'
import React from 'react'

import { useSession } from 'next-auth/react'
import { date } from 'zod'




function page() {

  const {data:session} = useSession()

  const user = session?.user

  console.log(user);
  

  return (
    <div>Check pgepage</div>
  )
}

export default page