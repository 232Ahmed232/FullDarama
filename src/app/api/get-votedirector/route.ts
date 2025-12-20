import dbConnect from "@/lib/dbConnect";
import { Director } from "@/models/Director_model";

export async function GET(request:Request){
    await dbConnect()

    const directors = await Director.find({
        isActive:true
    })

    return Response.json(
            {
                success:true,
                message:directors
            },
            {status:200}
        )
    
}