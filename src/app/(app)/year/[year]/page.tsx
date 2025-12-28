"use client"

import { Card } from '@/components/myComp/card'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const pramas = useParams()
  const [dramas,setDramas] = useState([])
  useEffect(()=>{
    const getdarama = async()=>{
    const respose = await axios.get("/api/get-darama")
    if (respose.data.success) {
      setDramas(respose.data.message.filter((ele:any) => ele.year == pramas.year));
    }
    
    
    }
    getdarama()
  },[])

  console.log(dramas);
  
  return (
  <div className="flex justify-around flex-wrap items-center-safe">
    {dramas.length>0? dramas.map((ele:any)=>(
      <Card key={ele._id} name={ele.name} img={ele.poster} rating={ele.averageRating}/>

    )):(<h1>No Darama Found</h1>) }
    
  </div>
  );
}

export default page