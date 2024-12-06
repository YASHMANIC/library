
import Link from "next/link";
import Image from "next/image";
import {IconBadge} from "@/components/icon-badge";
import {BookOpen} from "lucide-react";

interface CourseCardProps {
    id:string,
    title:string,
    imageUrl:string,
    chapterLength:number,
    category:string,
}
const CourseCard = ({id,title,imageUrl,chapterLength,category}:CourseCardProps) => {
    return(
       <Link href={`/course/${id}`}>
           <div className="group hover:shadow-md transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image src={imageUrl} alt={"Course Image"} fill className="object-cover" />
                </div>
               <div className="flex flex-col pt-2">
                   <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                       {title}
                   </div>
                   <p className="text-xs text-muted-foreground">{category}</p>
                   <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                       <div className="flex items-center gap-x-1 text-slate-500">
                       <IconBadge icon={BookOpen} size={"sm"}/>
                       {chapterLength === 1 ? `${chapterLength} Chapter` : `${chapterLength} Chapters`} 
                       </div>
                   </div>
               </div>
           </div>
       </Link>
    )
}
export default CourseCard