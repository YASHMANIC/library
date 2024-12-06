"use client"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

export const SignOut = () => {
    return (
        <div className="ml-auto p-5">
        <Button variant="destructive" onClick={() => signOut()}>Sign Out</Button>
    </div>
    )
}

