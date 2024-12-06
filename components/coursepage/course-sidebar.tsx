import {Chapter, Course} from "@prisma/client";
import {redirect} from "next/navigation";
import CourseSidebarItem from "@/components/coursepage/course-sidebar-item";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";

interface CourseSidebarProps {
    course:Course &{
        chapters:(Chapter)[]
};
}
const CoursePage =async ({course}:CourseSidebarProps) => {
    if(!getServerSession()){
        return redirect('/')
    }
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
           <div className="p-8 flex flex-col border-r">
            <Link href={`/books`}>
            <div className="flex items-center gap-x-2 mb-5">
                <ArrowLeft className="h-4 w-4" />Back
            </div>
            </Link>
               <h1 className="font-semibold mt-5">
                   {course.title}
               </h1>
               
           </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter)=>(
                    <CourseSidebarItem id={chapter.id} key={chapter.id} label={chapter.title} courseId={course.id}/>
                ))}
            </div>
        </div>
    )
}
export default CoursePage