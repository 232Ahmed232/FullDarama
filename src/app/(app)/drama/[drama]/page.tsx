"use client"

import React from 'react'

import { useDrama } from '@/context/dramaContext'
import { useParams } from 'next/navigation'
import {Types} from "mongoose";



function page() {
    const paramas = useParams()
    const {list} = useDrama()
    // const id:Types.ObjectId = paramas.drama
    console.log(paramas);
    
    console.log(list);
    
    const objDrama = list.find(item => item._id == paramas.drama)
  return (
    <div>{objDrama?objDrama.name: "Darama not found"}</div>
  )
}

export default page