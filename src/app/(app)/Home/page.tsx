"use client"
import Image from "next/image";
import fimage from "../../public/pics/HomeScreen.webp"
import Link from "next/link";
import { Card } from "@/components/myComp/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Darama } from "@/models/darama_model";
import { useDrama } from "@/context/dramaContext";
import { Input } from "@/components/myComp/search";
export default function Home() {
  const { list, search } = useDrama()
  
 const searchList = list.filter((item) => {
        const searchTo = search.toLowerCase()
        const name = item.name.toLowerCase()


        return search && name.includes(searchTo)
    })


  return (
    <div>
      <Input />
      <div className="flex justify-around flex-wrap items-center-safe">
        {
          searchList.length>0? searchList.map((ele: any) => (
          <Card key={ele._id} name={ele.name} img={ele.poster} rating={ele.averageRating} link={ele._id}/>

        )): list.length > 0 ? list.map((ele: any) => (
          <Card key={ele._id} name={ele.name} img={ele.poster} rating={ele.averageRating} link={ele._id}/>

        )) : (<h1>No Darama Found</h1>)
        }

      </div>
    </div>
  );
}
