import {Category, Course} from "@prisma/client";
import CourseCard from "./course-card";


type courseWithProgressWithCategory =Course & {
    category : Category | null;
    chapters : {id:string}[];
}
interface CourseListProps{
    items:courseWithProgressWithCategory[]
}
const CoursesList = ({items}:CourseListProps) => {
    return(
        <div>
            <div className="grid xs:grid-cols-1 space-x-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((course) => (
                    <CourseCard key={course.id} id={course.id} title={course.title} imageUrl={course.imageUrl!}
                                chapterLength={course.chapters.length}
                                category={course?.category?.name!}/>
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No Courses Available
                </div>
            )}
        </div>
    )
}
export default CoursesList