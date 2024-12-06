// "use client"
import { getCourses } from "@/actions/get-dashboardCourses"
import { SignOut } from "@/components/authentication/sign-out"
import CoursesList from "@/components/Dashboard/course-list"
import InfoCard from "@/components/Dashboard/info-card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"


interface SearchPageProps{
  searchParams:{
      title:string
      categoryId:string
  }
}

const BooksPage = async({searchParams}:SearchPageProps) => {
    const courses = await getCourses({
      ...searchParams
    })
    return (
        <>
          <div className="flex items-center flex-col">
            <div className="flex justify-end w-full">
                <Link href="courses/create">
                <Button  variant={"default"} size={"lg"} className="mt-5 ml-10"  >Create a Course</Button>
                </Link>
                <SignOut/>
            </div>     
        </div>
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <InfoCard icon={Clock} numberOfItems={courses.length} label={"Available Courses"} />
            </div>
            <CoursesList items={[...courses]}/>
        </div>
        </>
    )
}

export default BooksPage