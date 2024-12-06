"use server"

import * as z from "zod";
import { db } from "../lib/db";

import bcrypt from "bcryptjs" 
import { RegisterSchema } from "@/Schemas";

export const Register = async(values:z.infer<typeof RegisterSchema>) => {
     const validateFields = RegisterSchema.safeParse(values);
    if(!validateFields.success){
       return {error:"Invalid Fields"}
      }
    const {name,email,password} = validateFields.data
    const userExists = await db.user.findUnique({
        where:{email}
    })
    if(userExists) return {error:"User Already Exists"}
    const hashPassword = await bcrypt.hash(validateFields.data.password,10);
    const localTime = new Date();  // This gets the current local time
    const utcTime = new Date(localTime.toISOString()); 
    const user = await db.user.create({
         data:{
            name,
            email,
            password:hashPassword,
            createdAt:utcTime
        }
    })

    return {success:"OTP Sent Successfully"};
}