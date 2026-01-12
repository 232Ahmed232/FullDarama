'use client'

import React, { createContext, useContext, useEffect, useState } from "react"
import mongoose,{Schema,Document,Types} from "mongoose";
import axios from "axios";

import { Female_Actor } from "@/models/Female_Actor_model";
import { Actor } from "@/models/Actor_model";

type DramaItem = {
    averageRating?: React.ReactNode;
    actorDetails?:React.ReactNode[];
    producerDetails?:React.ReactNode[];
    writerDetails?:React.ReactNode[];
    directorsDetails?:React.ReactNode[];

    Female_ActorsDetails?:React.ReactNode[];
    _id:string;
    name: string;
    poster?: string | undefined;
    plot?: string;
    ost?: Types.ObjectId;
    year: number;
    channel: string;
    NoofEpisodes?: number;
    writers: Types.ObjectId[];
    directors: Types.ObjectId[];
    producers: Types.ObjectId[];
    genres: string[];
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
