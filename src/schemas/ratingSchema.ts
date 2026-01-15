import {z} from "zod"


export const RatingSchema = z.object({
    stars: z.number().min(1,{message:"Atleast gave 1 start"}).max(10,{message:"No more then 5 starts"}),
   
    comment:z.string().min(6,{message:"Atleast six charcters"})
})