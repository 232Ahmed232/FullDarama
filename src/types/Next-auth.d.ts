import 'next-auth'
import { DefaultSession } from 'next-auth';



declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        rating?: Types.ObjectId[];
        isVotedActor?: boolean;
        isVotedFemaleActor?: boolean;
        isVotedDirector?: boolean;
        isVotedWriter?: boolean;
        isVotedOst?: boolean;
        username?: string;
    }
    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            rating?: Types.ObjectId[];
            isVotedActor?: boolean;
            isVotedFemaleActor?: boolean;
            isVotedDirector?: boolean;
            isVotedWriter?: boolean;
            isVotedOst?: boolean;
            username?: string;
        } & DefaultSession['user']
    }


}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        rating?: Types.ObjectId[];
        isVotedActor?: boolean;
        isVotedFemaleActor?: boolean;
        isVotedDirector?: boolean;
        isVotedWriter?: boolean;
        isVotedOst?: boolean;
        username?: string;
    }
}


