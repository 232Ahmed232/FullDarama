"use client"

import React from 'react'

import { useDrama } from '@/context/dramaContext'
import { useSession } from 'next-auth/react'

import { useParams } from 'next/navigation'
import { Types } from "mongoose";
import Image from "next/image";

import { Star, StarHalf, StarOff } from "lucide-react";
import { Female_Actor } from '@/models/Female_Actor_model';
import { Rate } from '@/components/myComp/Rate'

function page() {
  const paramas = useParams()
  const { list } = useDrama()

  const { data: session } = useSession()
  
  const user = session?.user
  // const id:Types.ObjectId = paramas.drama
  // console.log(paramas);

  // console.log(list);

  const objDrama = list.find(item => item._id == paramas.drama)
  console.log(objDrama);
  console.log(user);

  const cla = 'font-bold my-5 italic text-3xl'

  return (
    <div className='flex flex-col mx-auto  items-center w-3/4 justify-center'>
      <h1 className='font-extrabold text-3xl my-4'>{objDrama?.name}</h1>
      <img src={objDrama?.poster} />
      <div className='flex flex-row'>
        {objDrama?.genres?.map((ele) => (
          <div key={ele} className='border-2 m-2 px-2 rounded-2xl'>{ele}</div>
        ))}
      </div>
      <p className='w-3/4'>
        {objDrama?.plot}
      </p>
      <h3><span className='font-bold'>Year: </span> {objDrama?.year}</h3>
      {/* <h3><span>No of Episodes: </span> {objDrama?.NoofEpisodes}</h3> */}
      <h3><span className='font-bold'>Channel : </span> {objDrama?.channel}</h3>
      <h3>
        Rating: {objDrama?.averageRating}


        {objDrama?.averageRating ?
          <div style={{ display: "flex", gap: "8px", fontSize: "24px" }}>
            {Array.from({ length: Math.round(Number(objDrama.averageRating)) }).map((_, index) => (
              // <p key={index}>Item {index + 1}</p>
              <Star key={index} color="gold" size={32} fill='gold' />

            ))}
          </div>
          : "Not rated yed"}



        {/* Half star */}
        {/* <StarHalf color="gold" size={32} strokeWidth={2} /> */}
      </h3>
      <Rate/>
      <h2 className={cla}>Cast</h2>
      <div className='flex gap-4'>
            {objDrama?.Female_ActorsDetails?.map((ele:any) => (
              <div key={ele?._id} className='flex flex-col gap-2.5 justify-center items-center'>
                <img className='rounded-full aspect-square w-64' src={ele?.img} alt=""/>
              {ele?.fullName}
            </div> 
          ))}
            {objDrama?.actorDetails?.map((ele:any) => (
              <div key={ele?._id} className='flex flex-col gap-2.5 justify-center items-center'>
                <img className='rounded-full aspect-square w-64' src={ele? ele.img : "https://www.bing.com/ck/a?!&&p=7df309617b23d752e5e3a9f4804d2dc091adc692efc11ea45e7d80fee115748bJmltdHM9MTc2ODE3NjAwMA&ptn=3&ver=2&hsh=4&fclid=24f83e26-7aac-6126-1ad7-287b7b986065&u=a1L2ltYWdlcy9zZWFyY2g_cT1kZWZhdWx0K3VzZXIraW1hZ2UmaWQ9QjU4OTg3NTYyRUFCRTE4NTU2MTA4RjFCRTVEMDE5N0IwQURCQTZCQSZGT1JNPUlRRlJCQQ"} alt=""/>
                {ele?.fullName}
            </div> 
            ))}
      </div>

        <h2 className={cla}>Director</h2>
      <div className='flex gap-4'>
            {objDrama?.directorsDetails?.map((ele:any) => (
              <div key={ele?._id} className='flex flex-col gap-2.5 justify-center items-center'>
                <img className='rounded-full aspect-square w-64' src={ele?.img} alt=""/>
              {ele?.fullName}
            </div> 
          ))}
           
      </div >
        <h2 className={cla}>Writers</h2>
      <div className='flex gap-4'>
            {objDrama?.writerDetails?.map((ele:any) => (
              <div key={ele?._id} className='flex flex-col gap-2.5 justify-center items-center'>
                <img className='rounded-full aspect-square w-64' src={ele?.img} alt=""/>
              {ele?.fullName}
            </div> 
          ))}
           
      </div>
        <h2 className={cla}>Producer</h2>
      <div className='flex gap-4'>
            {objDrama?.producerDetails?.map((ele:any) => (
              <div key={ele?._id} className='flex flex-col gap-2.5 justify-center items-center'>
                <img className='rounded-full aspect-square w-64' src={ele?.img} alt=""/>
              {ele?.fullName}
            </div> 
          ))}
           
      </div>
    </div>
  )
}

export default page