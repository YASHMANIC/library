import {NextResponse} from "next/server";
import {db} from "@/lib/db";
export async function POST(req:Request){
    try {
        const{title,email} = await req.json()
        if(!title || !email){
            return new NextResponse("Bad Request",{status:400})
        }
        const course = await db.course.create({
            data:{
                email,
                title,
            }
        })
        return NextResponse.json(course)
    }catch(err){
        console.log("[COURSES] ",err);
        return new NextResponse("Internal Server Error",{status:500})
    }
}
