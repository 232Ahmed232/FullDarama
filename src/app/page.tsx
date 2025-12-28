"use client"
import Image from "next/image";
import fimage from "../../public/pics/HomeScreen.webp"
import Link from "next/link";
import { Card } from "@/components/myComp/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Darama } from "@/models/darama_model";
export default function Home() {
  const [dramas,setDramas] = useState([])
  useEffect(()=>{
    const getdarama = async()=>{
    const respose = await axios.get("api/get-darama")
    if (respose.data.success) {
      setDramas(respose.data.message);
    }
    
    
    }
    getdarama()
  },[])

  console.log(dramas);
  
  return (
  <div className="flex justify-around flex-wrap items-center-safe">
    {dramas.map((ele:any)=>(
      <Card name={ele.name} img={ele.poster} rating={ele.averageRating}/>

    ))}
    
  </div>
  );
}
