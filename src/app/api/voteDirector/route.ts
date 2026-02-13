import dbConnect from "@/lib/dbConnect";
import { Director } from "@/models/Director_model";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";


export async function POST(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions);
    // console.log(session);
    const { actId } = await request.json()

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user._id;
    const userAlreadyVoted:any = await User.findById(userId)
    if (userAlreadyVoted.isVotedActor) {
        return Response.json({ message: "User already Voted" }, { status: 201 });
    }


    const DirectorId = actId
    console.log(DirectorId);

    const VotedDirector:any = await Director.findById(DirectorId)

    if (VotedDirector) {
        VotedDirector.votedBy.push({ user: userId })
        VotedDirector.votes += 1

        await VotedDirector.save()

        userAlreadyVoted.isVotedActor = true
        await userAlreadyVoted.save()
        return Response.json({ message: "You Voted" }, { status: 200 });
    } else {
        return Response.json({ message: "Something went wrong" }, { status: 500 });
    }



}