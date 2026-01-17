import dbConnect from "@/lib/dbConnect";
import { Rating } from "@/models/Rating_model"
import { Darama } from "@/models/darama_model";
import { User } from "@/models/User";


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
    await dbConnect()

    try {

        const session = await getServerSession(authOptions);
        console.log(session);
        

        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user._id; 
        
        const { dramaId, stars, comment } = await request.json();

        // 1️⃣ Validate required fields
        if (!dramaId || !stars || !comment) {
            return Response.json({ message: "Drama ID, stars, and comment are required" });
        }

        // 2️⃣ Ensure the drama exists
        const drama = await Darama.findById(dramaId);
        if (!drama) {
            return Response.json({ message: "Drama not found" });
        }

        // 3️⃣ Optional: prevent duplicate ratings (one per user per drama)
        const existing = await Rating.findOne({ drama: dramaId, user: userId });
        if (existing) {
            return Response.json({ message: "You have already rated this drama" });
        }

        // 4️⃣ Create the rating
        const rating = await Rating.create({
            stars,
            comment,
            drama: dramaId,
            user: userId
        });

        // 5️⃣ Push rating to the user's ratings array
        await User.findByIdAndUpdate(userId, { $push: { rating: rating._id } });

        
        // 6️⃣ Optional: calculate average rating for the drama
        const allRatings = await Rating.find({ drama: dramaId });
        const avgStars =
            allRatings.reduce((sum, r) => sum + r.stars, 0) / allRatings.length;

        // 7️⃣ Respond with success
        return Response.json({
            message: "Rating added successfully",
            rating,
            averageStars: avgStars.toFixed(2)
        });
    } catch (error) {
        console.error("❌ Error adding rating:", error);
       return  Response.json({ message: "Internal server error" });
    }

}