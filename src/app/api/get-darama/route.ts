import dbConnect from "@/lib/dbConnect";
import {getDramasWithActorsAndRatings} from "@/lib/db_aggregation.js"

export async function GET(request:Request){
    await dbConnect()
    const darama = await getDramasWithActorsAndRatings()
    // console.log(darama);

    return Response.json(
            {
                success:true,
                message:darama
            },
            {status:200}
        )
    


}