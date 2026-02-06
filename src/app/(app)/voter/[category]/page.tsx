'use client'
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
    <div>{params.category}</div>
  )
}

export default page