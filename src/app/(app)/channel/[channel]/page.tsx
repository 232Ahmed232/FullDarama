"use client"

import { Card } from '@/components/myComp/card'
import { useDrama } from '@/context/dramaContext'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const pramas = useParams()
    const {list,setList} = useDrama()
  
  useEffect(()=>{
    const getdarama = async()=>{
    const respose = await axios.get("/api/get-darama")
    if (respose.data.success) {
      setList(respose.data.message.filter((ele:any) => ele.channel == pramas.channel));
    }
    
    
    }
    getdarama()
  },[])

  
  return (
  <div className="flex justify-around flex-wrap items-center-safe">
    {list.length>0? list.map((ele:any)=>(
      <Card key={ele._id} name={ele.name} img={ele.poster} rating={ele.averageRating}/>

    )):(<h1>No Darama Found</h1>) }
    
  </div>
  );
}

export default page