import dbConnect from "@/lib/dbConnect";
import { Writer } from "@/models/Writer_model";

export async function GET(request:Request){
    await dbConnect()

    const writers = await Writer.find({
        isActive:true
    })

    return Response.json(
            {
                success:true,
                message:writers
            },
            {status:200}
        )
    
}