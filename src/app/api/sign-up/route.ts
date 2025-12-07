import dbConnect from "@/lib/dbConnect";
import {User} from "@/models/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod";


export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()
        const existingUsernameisVerified = await User.findOne({
            username,
            isVerified: true
        })


        if (existingUsernameisVerified) {
            return Response.json({
                success: false,
                message: "Username is already Taken"
            }, { status: 400 })
        }

        const existingUserByEmail = await User.findOne({ email })

        const verifyCode = Math.floor(10000 + Math.random() + 900000).toString()

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                success: false,
                message: "Email is already Taken"
            }, { status: 400 })
            } else {
                const hashPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry =new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        } else {
            const hashPassword = await bcrypt.hash(password, 10)

            const expirayDate = new Date()
            expirayDate.setHours(expirayDate.getHours() + 1)

            const newUser = new User({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expirayDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            })

            await newUser.save()
        }
        //Send verification Email

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: "User Register success fully please verify your Email"
        }, { status: 400 })

    } catch (error) {
        console.log(error);
        
        console.error("Error Registration User", error);
        return Response.json(
            {
                success: false,
                message: "Error in registration User"
            },
            {
                status: 500
            }
        )

    }
}