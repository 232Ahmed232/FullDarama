import dbConnect from "@/lib/dbConnect";

import {User} from "@/models/User";


export async function POST(request:Request){
    await dbConnect()

    try {
      const {username,code} = await request.json()
    console.log(username);
    console.log(code);
    
    
     const decodedUsername =  decodeURIComponent(username)
    
     const user = await User.findOne({username:decodedUsername})

     if (!user) {
        return Response.json(
            {
                success:false,
                message:"User not exist"
            },
            {status:500}
        )
     }

     const isCodeValid = user.verifyCode === code

     const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
     console.log(user.verifyCodeExpiry);
     console.log(new Date());
     

     if (isCodeValid && isCodeNotExpired) {
        user.isVerified = true

       await  user.save()
        return Response.json(
            {
                success:true,
                message:"User has been verified"
            },
            {status:200}
        )
     }else if (!isCodeNotExpired) {
         return Response.json(
            {
                success:false,
                message:"Verification code is expired"
            },
            {status:500}
        )
     }else {
         return Response.json(
            {
                success:false,
                message:"Code is Invalid"
            },
            {status:500}
        )
     }
    } catch (error) {
        console.error("Verifing User",error);

        return Response.json(
            {
                success:false,
                message:"Verifying User"
            },
            {status:500}
        )
        
    }
}