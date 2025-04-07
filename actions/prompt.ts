"use server"

import * as z from "zod";
import { db } from "../lib/db";
import { PromptSchema } from "@/Schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth-options";
interface PromptProps {
    response: string;
}

export const Prompt = async (values: z.infer<typeof PromptSchema>, { response }: PromptProps) => {
    const validateFields = PromptSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: "Invalid Fields" }
    }

    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return { error: "User Not Found" }
        }

        if (!session.user.email) {
            return { error: "Email not found" };
        }

        const { prompt } = validateFields.data;
        console.log("Prompt: ", prompt, "Response: ", response,"email: ", session.user.email);
        const promptCreated = await db.generator.create({
            data: {
                email: session.user.email,
                response: response,
                prompt: prompt,
            }
        });

        return { success: "Prompt saved successfully" };
    } catch (error) {
        return { error: "Something went wrong" };
    }
}