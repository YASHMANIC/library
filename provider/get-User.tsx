"use client"
import {useSession} from "next-auth/react";

export const usecurrentUser = () =>{
    const session = useSession();
    return session.data?.user;
}