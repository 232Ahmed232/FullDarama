import {
  CheckIcon,
  CreditCardIcon,
  InfoIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useState } from "react"
import { useDrama } from "@/context/dramaContext";

export function Input() {

  const {search,setSearch} = useDrama()
  console.log(search);
  
  return (
    <div className="grid w-full max-w-sm gap-6  mx-auto">
      <InputGroup>
        <InputGroupInput placeholder="Search..." value={search} onChange={(e)=> setSearch(e.target.value)}/>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      
    </div>
  )
}
