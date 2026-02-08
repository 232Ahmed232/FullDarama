'use client'
import { CardImage } from '@/components/myComp/cardImage';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const params = useParams()

  console.log(params);
  const [list, setList] = useState([])

  useEffect(() => {
    const getdata = async () => {

      if (params.category == "actor") {
        const respose = await axios.get("/api/get-voteActor")
        if (respose.data.success) {
          setList(respose.data.message);
        }
      }



      else if (params.category == "actress") {
        const respose = await axios.get("/api/get-votedFemaleactors")
        if (respose.data.success) {
          setList(respose.data.message);
        }
      }
        else if (params.category == "director") {
          const respose = await axios.get("/api/get-votedirector")
          if (respose.data.success) {
            setList(respose.data.message);
          }

        }


        }
        getdata()
      }, [])

      console.log(list);
      
  return (
    <div>
      <h1 className='text-3xl font-bold text-center my-4'>Vote For {params.category}</h1>
      <div className='flex '>
      {(list.length>0)? list.map((ele:any) => (
        <CardImage key={ele._id} img={ele.img} name={ele.fullName} username={ele.username} role={ele.role} actId = {ele._id} />
      )) :"Nothing to vote"}
      
      </div>
      </div>
  )
}

export default page