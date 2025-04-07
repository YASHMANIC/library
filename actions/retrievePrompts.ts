"use server"
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth-options";
    const getPrompts = async () => {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return { error: "User Not Found" }
        }

        if (!session.user.email) {
            return { error: "Email not found" };
        }
        try {
            const response = await db.generator.findMany({
                where:{
                    email: session.user.email
                }
            })
            return response.map((item) => ({
                prompt: item.prompt,
                response: item.response
            }));
        } catch (error) {
            console.error("Error fetching previous messages:", error);
            return { error: "Something went wrong" };
        }
    };

    export default getPrompts;