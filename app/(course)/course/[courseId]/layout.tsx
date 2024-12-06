import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import CourseSidebar from "@/components/coursepage/course-sidebar";
import CourseNavbar from "@/components/coursepage/course-navbar";
import { getServerSession } from "next-auth";

const CourseLayout = async ({children,params} :{children:React.ReactNode;params:{courseId:string}}) => {
    if (!getServerSession()){
        return redirect('/')
    }
    const course = await db.course.findUnique({
        where:{
            id: params.courseId,
        },
        include:{
            chapters:{
                where:{
                    isPublished:true
                },
                orderBy:{
                    position:"asc"
                }
            }
        }
    })
    if(!course){
        return redirect('/')
    }
    return(
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar  course={course} />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar course={course}/>
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
            {children}
            </main>
        </div>
    )
}
export default CourseLayout