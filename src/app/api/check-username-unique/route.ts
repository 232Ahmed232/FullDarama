import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { success, z } from "zod";


import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username:usernameValidation
})


export async function GET(request:Request){
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)

        const queryParam = {
            username:searchParams.get("username")
        }

       const result =  UsernameQuerySchema.safeParse(queryParam)

       console.log(result);

       if (!result.success) {
         const usernameErrors = result.error.format().username?._errors || []

         return Response.json(
            {
                success:false,
                message: usernameErrors?.length > 0?usernameErrors.join(","):"Invalid username"
            },
            {status:401}
         )
       }

       const {username} = result.data

     const existingUsername   = await UserModel.findOne({username})
       
      if (existingUsername) {
         return Response.json(
            {
                success:false,
                message:"Username is already taken"
            },
            {status:500}
        )
      }

       return Response.json(
            {
                success:true,
                message:"Username is avalable"
            },
            {status:200}
        )
    } catch (error) {
        console.error("Error in checking Username",error);

        return Response.json(
            {
                success:false,
                message:"Error in checking Username"
            },
            {status:500}
        )
        
    }
}