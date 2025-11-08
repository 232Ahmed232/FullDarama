import { z } from "zod";



export const usernameValidation = z
    .string()
    .min(2,"Username must be atleaset two charachters")
    .max(25,"Username must ne no more then 20 characters")
    .regex(/^[a-zA-Z0-9]+$/,"Username must not contain special charaters")


export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid Email address"}),
    password:z.string().min(6,{message:"Atleast six charcters"})
})