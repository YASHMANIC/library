import {Chapter, Course} from "@prisma/client";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import CourseSidebar from "@/components/coursepage/course-sidebar";


interface CourseSidebarProps{
    course:Course &{
        chapters:(Chapter)[]
};
}

const CourseMobileSidebar = ({course}:CourseSidebarProps) => {
    return(
        <Sheet>
            <SheetTrigger className={"md:hidden pr-2 hover:opacity-75"}>
                <Menu/>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0 bg-white w-72">
                <CourseSidebar course={course}/>
            </SheetContent>
        </Sheet>
    )
}
export default CourseMobileSidebar