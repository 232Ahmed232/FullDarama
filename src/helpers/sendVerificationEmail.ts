import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse> {
    try {

         await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "Verification code",
    react: VerificationEmail({username,otp:verifyCode}),
  });
        
        return {success:true,message:"Successfully send Verification"}

    } catch(emailError) {
        console.error("Error sending Verification",emailError);
        return {success:false,message:"Faled to send Verification"}
        
    }
}
