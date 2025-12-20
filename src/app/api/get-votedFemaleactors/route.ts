import dbConnect from "@/lib/dbConnect";
import { Female_actor } from "@/models/Female_Actor_model";

export async function GET(request:Request){
    await dbConnect()

    const females = await Female_actor.find({
        isActive:true
    })

    return Response.json(
            {
                success:true,
                message:females
            },
            {status:200}
        )
    
}