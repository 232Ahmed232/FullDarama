'use client'

import { createContext, useContext, useState } from "react"
import mongoose,{Schema,Document,Types} from "mongoose";


type DramaItem = {
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
}

const DramaContext = createContext<DramaContextType | null>(null)

export function  DramaContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [list, setList] = useState<DramaItem[]>([])

  return (
    <DramaContext.Provider value={{ list, setList }}>
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
