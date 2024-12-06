import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";

export async function PUT(req:Request,{params}:{params:{courseId:string}}){
    try{
        const {list} = await req.json()
        if(!getServerSession()){
            return new NextResponse("Unauthorized",{status:401})
        }

        const courseOwner = await db.course.findUnique({
            where:{
                id:params.courseId
            }
        })
        if(!courseOwner){
            return new NextResponse("Unauthorized",{status:401})
        }
        for(let item of list){
            await db.chapter.update({
                where:{id:item.id},
                data:{position:item.position}
            })
        }
         return new  NextResponse("Success",{status:200})
    }catch(err){
        console.log("[REORDERS]",err);
        return new  NextResponse("Internal Server Error",{status:500})
    }
}