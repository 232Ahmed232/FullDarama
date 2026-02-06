'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const params = useParams()

    console.log(params);

    useEffect(()=>{},[])
    
  return (
    <div>{params.category}</div>
  )
}

export default page