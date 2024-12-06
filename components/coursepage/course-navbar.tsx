import {Chapter, Course,} from "@prisma/client";
import CourseMobileSidebar from "@/components/coursepage/course-mobile-sidebar";
import at from "../../public/at.png"
import NavbarRoutes from "./course-navbar-routes";

interface CourseNavbarProps{
    course:Course &{
        chapters:(Chapter)[]
};
}

const CourseNavbar = ({course}:CourseNavbarProps) => {
    return(
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseMobileSidebar course={course}/>
            <NavbarRoutes/>
        </div>
    )
}
export default CourseNavbar