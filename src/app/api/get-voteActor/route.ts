import dbConnect from "@/lib/dbConnect";
import { Actor } from "@/models/Actor_model";

export async function GET(request:Request){
    await dbConnect()

    const actors = await Actor.find({
        isActive:true
    })

    return Response.json(
            {
                success:true,
                message:actors
            },
            {status:200}
        )
    
}