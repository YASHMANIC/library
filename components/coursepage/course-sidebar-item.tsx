"use client"
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface CourseSidebarItemProps {
    label:string
    id:string
    courseId:string
}
const CourseSidebarItem = ({label,id,courseId}:CourseSidebarItemProps) => {
    const pathName = usePathname()
    const router = useRouter()
    const isActive = pathName?.includes(id)
    const onClick = ()=> {
        router.push(`/course/${courseId}/chapters/${id}`)
    }
    return (
        <button onClick={onClick} type={"button"} className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-gray-400",
            isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",isActive && "bg-emerald-200/20")}>
            <div className="flex items-center gap-x-2 py-4">
                {label}
            </div>
            
        </button>
    )
}
export default CourseSidebarItem