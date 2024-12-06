"use server"

import { db } from "@/lib/db"

export const updateStatus = async (email:string) => {
    try {
        const user = await db.user.update({
            where:{email},
            data:{
                verified : true
            }
        })
        return {success:"User Status Updated Successfully"}
    } catch (error) {
        return{error: "Error updating"}
    }
}

export const checkStatus = async (email:string) => {
    const user = await db.user.findUnique({
        where:{email}
    })
    if(user?.verified === false) return {error:"Account not verified"}
    return {success:"Account Verified"}
}

export const removeToken = async (email:string) => {
   try {
    const user = await db.verficationToken.deleteMany({
        where:{
            email,
        }
    })
    return {success:"Token Removed Successfully"}
   } catch (error) {
    return {error:"Unexpected error"}
   }
}