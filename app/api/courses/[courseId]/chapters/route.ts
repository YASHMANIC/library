import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req:Request,{params}:{params:{courseId:string}}){
        try {
            const {title} = await req.json()
            if(!getServerSession()){
            return new NextResponse("Unauthorized",{status:401})
        }
            const courseOwner = await db.course.findUnique({
            where:{
                id:params.courseId,
            }
        })
        if(!courseOwner){
            return new NextResponse("Unauthorized",{status:401})
        }

        const lastChapter = await db.chapter.findFirst({
            where:{
                courseId:params.courseId,
            },
            orderBy:{
                position:"desc"
            }
        })
        const newPosition = lastChapter ? lastChapter.position + 1 : 1;
        const chapter = await db.chapter.create({
            data:{
                title,
                courseId:params.courseId,
                position: newPosition
            }
        })
            return NextResponse.json(chapter)
        }catch(err){
            console.log("[CHAPTERS_POST]",err)
            return new NextResponse("Server Internal Error",{status:500})
        }
}