"use server"

import nodemailer from "nodemailer"
import { db } from "@/lib/db"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "yaswanthbattula987@gmail.com",     // Your Gmail address
      pass: "zgxc tfqf nddu omzs",      // Your Gmail password or App password
    }
  });

  

export async function sendVerification(email:string,token:string) {
    const mailOptions = {
        from: "yaswanthbattula987@gmail.com",        // sender address
        to: email,        // list of recipients
        subject: 'Verification Token', // Subject line
        text: 'verification token is'+token, // plain text body
        html: '<b>Verification Token is '+token+' expires in 5 minutes</b>' // HTML body
      };
  try {
    const user = await db.verficationToken.findUnique({
        where:{
            email
        }
    })
    if(user) return {error:"OTP Already Exists"}
    await transporter.sendMail(mailOptions);
    await db.verficationToken.create({
        data:{
            email,
            token,
            expires:new Date(Date.now() + 5 * 60 * 1000)
        }
    })
    return {success:"OTP Sent Successfully"}
  } catch (error) {
    console.log("Sending Token error",error)
  }
}
