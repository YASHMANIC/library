import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";

export async function DELETE(req:Request,{params}:{params:{courseId:string,chapterId:string}}){
    try {
        if(!getServerSession()){
            return new NextResponse("Unauthorized",{status:401})
        }
        const ownCourse = await db.course.findUnique({
            where:{id:params.courseId}
        })
        if(!ownCourse){
            return new NextResponse("Unauthorized",{status:401})
        }
        const chapter = await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            }
        })
        if(!chapter){
            return new NextResponse("Not Found",{status:404});
        }
        const deletedChapter = await db.chapter.delete({
            where:{
                id:params.chapterId
            }
        });
        const publishedChaptersInCourse = await db.chapter.findMany({
            where:{
                courseId:params.courseId,
                isPublished:true
            }
        })
        if(!publishedChaptersInCourse.length){
            await db.course.update({
                where:{
                    id:params.courseId
                },
                data:{
                    isPublished:false
                }
            })
        }
        return NextResponse.json(deletedChapter)
    }catch (err){
        console.log("[CHAPTER_DELETE]",err)
        return new NextResponse("Internal Server Error",{status:500})
    }
}

export async function PATCH(req:Request,{params}:{params:{courseId:string,chapterId:string}}){
    try {
        const {isPublished,...values} = await req.json()
        if(!getServerSession()){
            return new NextResponse("Unauthorized",{status:401})
        }
        const ownCourse = await db.course.findUnique({
            where:{id:params.courseId}
        })
        if(!ownCourse){
            return new NextResponse("Unauthorized",{status:401})
        }
        const chapter = await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            },
            data:{
                ...values
            }
        })
        return NextResponse.json(chapter)
    }catch (error){
        console.log("[CHAPTER_ID]",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}