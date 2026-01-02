'use client'

import { createContext, useContext, useEffect, useState } from "react"
import mongoose,{Schema,Document,Types} from "mongoose";
import axios from "axios";


type DramaItem = {
    _id:string;
    name: string;
    poster?: string;
    plot?: string;
    ost?: Types.ObjectId;
    year: number;
    channel: string;
    NoofEpisodes?: number;
    writers: Types.ObjectId[];
    directors: Types.ObjectId[];
    producers: Types.ObjectId[];
    generes: string[];
    actors: Types.ObjectId[];
    female_actors: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

type DramaContextType = {
  list: DramaItem[]
  setList: React.Dispatch<React.SetStateAction<DramaItem[]>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const DramaContext = createContext<DramaContextType | null>(null)

export function  DramaContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [list, setList] = useState<DramaItem[]>([])
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
      const getdarama = async () => {
        const respose = await axios.get("/api/get-darama")
        if (respose.data.success) {
          setList(respose.data.message);
        }
  
  
      }
      getdarama()
    }, [])

  return (
    <DramaContext.Provider value={{ list, setList ,search, setSearch}}>
      {children}
    </DramaContext.Provider>
  )
}

export function useDrama() {
  const context = useContext(DramaContext)
  if (!context) {
    throw new Error("useDrama must be used inside DramaContextProvider")
  }
  return context
}
