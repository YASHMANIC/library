"use client"

import * as z from 'zod'
import {Button} from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Chapter} from "@prisma/client";
import { CldVideoPlayer } from 'next-cloudinary';
import { ChapterVideo } from '@/Schemas';
import VideoUpload from '../video-upload';
import VideoPlayer from '../video/video-player';

interface ChapterVideoFormProps{
         initialData:Chapter ,
         courseId:string,
         chapterId:string
}

const ChapterVideoForm = ({initialData, courseId, chapterId}:ChapterVideoFormProps) => {
    const [isEditing,setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()
    const onSubmit =async (values:z.infer<typeof ChapterVideo>) =>{
       try {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values)
           toast.success("Chapter Updated")
           toggleEdit()
           router.refresh()
       }catch{
           toast.error("Something Went Wrong")
       }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Video
                  <Button onClick={toggleEdit} variant={"ghost"}>
                      {isEditing && (
                    <>
                        Cancel
                    </>
                )}
                      {!isEditing && !initialData.videoUrl && (
                          <>
                              <PlusCircle className="h-4 w-4 mr-2"/>
                              Add an Video
                          </>
                      )}
                      {!isEditing && initialData.videoUrl &&(
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                    Edit Video
                    </>
                      )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <VideoIcon className={"h-10 w-10 text-slate-500"}/>
                    </div>
                ) :(
                    <div className="relative aspect-video mt-2">
                        <VideoPlayer videoUrl={initialData.videoUrl} height={"600"} width={"400"}/>
                </div>
                )
            )}
            {isEditing && (
               <div>
                   <VideoUpload
                   url={initialData.videoUrl??" "}
                   courseId={courseId}
                   chapterId={chapterId}/>
                   <div className="text-xs text-muted-foreground mt-4">
                      Upload this chapter&apos; video
                   </div>
                   <div className="text-xs text-muted-foreground mt-4">
                    After Uploading Wait for a Minute and Refresh the Page
                    </div>
               </div>
            )}
            {initialData.videoUrl && !isEditing  && (
                <div className="text-sm text-muted-foreground mt-2">
                    Video can Minutes few minutes to upload to upload. Refresh the page if video doesn&apos; appear
                </div>
            )}
        </div>
    )
}
export default ChapterVideoForm