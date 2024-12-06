import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";

export async function PATCH(
    req:Request,
    {params}:{params:{courseId:string,chapterId:string}}
){
    try{
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

        const chapter = await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            }
        })
        if(!chapter|| !chapter.title || !chapter.description || !chapter.videoUrl){
            return new NextResponse("Missed Required Fields",{status:400})
        }
        const publishedChapter = await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId,
            },
            data:{
              isPublished:true,
            }
        })
        return NextResponse.json(publishedChapter)

    }
    catch(err){
        console.log("[PUBLISH]",err)
        return new  NextResponse("Internal Server Error",{status:500})
    }
}