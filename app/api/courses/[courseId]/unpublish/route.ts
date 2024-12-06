import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";

export async function PATCH(
    req:Request,
    {params}:{params:{courseId:string}}
){
    try {
        if(!getServerSession()){
            return new NextResponse("Unauthorized",{status:401});
        }
        const course = await db.course.findUnique({
            where:{
                id:params.courseId,
            }
        })
        if(!course){
            return new NextResponse("Not Found",{status:404});
        }
        const unPublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
            },
            data:{
                isPublished:false
            }
        })
        return NextResponse.json(unPublishedCourse)
    }catch (err){
        console.log("[COURSE_ID_UNPUBLISH]",err)
        return new NextResponse("Internal Server Error",{status:500})
    }
}