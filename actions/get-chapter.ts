import {db} from "@/lib/db";
import { Chapter} from "@prisma/client";

interface GetChapterProps{
    courseId:string
    chapterId:string
}

export const GetChapter =async ({chapterId,courseId}:GetChapterProps) => {
        try {
        const course = await db.course.findUnique({
            where:{
                isPublished:true,
                id:courseId
            },
        });
        const chapter = await db.chapter.findUnique({
            where:{
                id:chapterId,
                isPublished:true
            }
        })
            if (!chapter || !course){
                throw new Error("Course Or Chapter Not Found")
            }
            let nextChapter : Chapter | null = null
            if (chapter.isFree){
                nextChapter = await db.chapter.findFirst({
                    where:{
                        courseId:courseId,
                        isPublished:true,
                        position:{
                            gt: chapter?.position
                        }
                    },
                    orderBy:{
                        position:"asc"
                    }
                })
            }
            return {
                chapter,
                course,
                nextChapter,
            }
        }
        catch (err){
            console.log("[GET_CHAPTER]",err);
            return {
                chapter:null,
                course:null,
                nextChapter:null,
            }
        }
}