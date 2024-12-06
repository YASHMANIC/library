import {Category, Course} from "@prisma/client";
import {db} from "@/lib/db";


type CourseWithProgressWithCategory =Course & {
    category : Category | null;
    chapters : {id:string}[];
}

type GetCourses = {
    title?:string
    categoryId?:string
}

export const getCourses = async ({title,categoryId }:GetCourses) : Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where:{
                isPublished:true,
                title:{
                    contains:title
                },
                categoryId
            },
            include:{
                category:true,
                chapters:{
                    where:{
                        isPublished:true
                    },
                    select:{
                        id:true
                    }
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        const coursesWithProgress:CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                if(course.chapters.length === 0){
                    return{
                        ...course,
                        
                    }
                }
                return {
                    ...course,
                };
            })
        )
        return coursesWithProgress;
    }catch (error){
        console.log("GET_COURSES",error)
        return []
    }
}