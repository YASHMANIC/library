import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request, { params }: { params: { courseId: string } }) {
    try {
      if (!getServerSession()) return NextResponse.json({ message: "Unauthorized", status: 401 }, { status: 401 });
      const course = await db.course.findUnique({
        where: {
          id: params.courseId,
        },
        include: {
          chapters: true,
        },
      });
      if (!course) {
        return NextResponse.json({ message: "Not Found", status: 404 }, { status: 404 });
      }
      const deletedCourse = await db.course.delete({
        where: {
          id: params.courseId,
        },
      });
      return NextResponse.json(deletedCourse);
    } catch (error) {
      console.log("[COURSE_ID_DELETE]", error);
      return NextResponse.json({ message: "Internal Error", status: 500 }, { status: 500 });
    }
  }
  

export async function PATCH(req:Request,{params}:{params:{courseId:string}}){
    try{
        if(!getServerSession()){
            return new NextResponse("Unauthorized",{status:401})
        }
        const {courseId} = params
        const values = await req.json()
        const course = await db.course.update({
            where:{
                id:courseId,
            },
            data:{
                ...values
            }
        })
        return NextResponse.json(course)
    }catch (error){
        console.log("[COURSE_ID]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}