import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {User} from "@/models/User";
import dbConnect from "@/lib/dbConnect";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("No User found with this email")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please Verify your account")
                    }

                    const isPassword = await bcrypt.compare(credentials.password, user.password)
                    // console.log(user);
                    
                    if (isPassword) {
                        return user
                    } else {
                        throw new Error("No User found with this email AND PASSWORD")

                    }
                } catch (err: any) {
                    throw new Error(err)
                }
            }
        })
    ],


    callbacks: {
         async jwt({ token, user,  }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVotedActor =user.isVotedActor
                token.rating = user.rating
                token.isVerified = user.isVerified
                token.username = user.username
            }
            return token
        },
        async session({ session,  token }) {
            if (token) {
                session.user._id= token._id
                session.user.rating = token.rating
                session.user.isVotedActor = token.isVotedActor
                session.user.isVerified = token.isVerified
                session.user.username = token.username
            }
            return session
        },
       
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET

}