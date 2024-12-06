"use server"

import { db } from "@/lib/db"
export const verifyToken = async(token:string,email:string) => {
    const user = await db.verficationToken.findUnique({
        where:{
            email
        }
    })
    const time = Date.now();
    if(token === user?.token && time <= user?.expires.getTime()) {
        return {success:"OTP Verified Successfully"}
    }
    if(token === user?.token && time > user?.expires.getTime()) {
        await db.verficationToken.delete({
            where:{
                email
            }
        })
        return {error:"OTP Expired"}
    }

  else return {error:"Invalid OTP"}
  }