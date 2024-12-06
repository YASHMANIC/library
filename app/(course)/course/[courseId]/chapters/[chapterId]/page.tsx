import {redirect} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import Preview from "@/components/preview";
import VideoPlayer from "@/components/video/video-player";
import { GetChapter } from "@/actions/get-chapter";
import { getServerSession } from "next-auth";

const ChapterIdPage =async ({params}:{params:{courseId:string,chapterId:string}}) => {
    if(!getServerSession()){
        return redirect('/')
    }
    const {chapter,course} = await GetChapter({chapterId:params.chapterId,courseId:params.courseId})
    if (!chapter || !course){
                return redirect("/books")
            }
    return(
        <div>
        
            <div className="flex flex-col mx-w-4xl pb-20 mx-auto">
                <div className="p-4">
                    <VideoPlayer videoUrl={chapter.videoUrl ?? ""} height="400" width="400"/>
                </div>
                <div>
                    <div className="flex flex-col md:flex-col items-center justify-between p-4">
                        <h2 className={"text-2xl font-medium mb-2"}>{chapter.title}</h2>
                      
                    </div>
                    <Separator/>
                    <div>
                        <Preview value={chapter.description!}/>
                    </div>    
                </div>
            </div>
        </div>
    )
}
export default ChapterIdPage