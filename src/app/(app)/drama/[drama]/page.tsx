"use client"

import React from 'react'

import { useDrama } from '@/context/dramaContext'
import { useParams } from 'next/navigation'
import {Types} from "mongoose";
import Image from "next/image";



function page() {
    const paramas = useParams()
    const {list} = useDrama()
    // const id:Types.ObjectId = paramas.drama
    // console.log(paramas);
    
    // console.log(list);
    
    const objDrama = list.find(item => item._id == paramas.drama)
  return (
    <div className='flex flex-col  items-center w-3/4 justify-center'>
      <h1>{objDrama?.name}</h1>
      <img src={objDrama?.poster}/>
      <div className='flex flex-row'>  
      {objDrama?.genres?.map((ele)=> (
        <div key={ele} className='border-2 m-2 px-2 rounded-2xl'>{ele}</div>
      ))}
      </div>
      <p>
        {objDrama?.plot}
      </p>
    </div>
  )
}

export default page