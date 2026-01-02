"use client"

import { Card } from '@/components/myComp/card'
import { useDrama } from '@/context/dramaContext'
import { useParams } from 'next/navigation'

function page() {
    const pramas = useParams()
    const {list} = useDrama()
    
 

    const  filterlist = list.filter((ele:any) => ele.year == pramas.year)

  return (
  <div className="flex justify-around flex-wrap items-center-safe">
    {filterlist.length>0? filterlist.map((ele:any)=>(
      <Card key={ele._id} name={ele.name} img={ele.poster} rating={ele.averageRating}/>

    )):(<h1>No Darama Found</h1>) }
    
  </div>
  );
}

export default page