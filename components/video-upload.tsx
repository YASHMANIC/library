"use client"

import toast from "react-hot-toast";
import axios from "axios";
import {CldUploadButton} from "next-cloudinary"
import { Button } from "./ui/button";

interface FileUploadProps{
    courseId:string,
    chapterId:string
    url:string
}


const VideoUpload = ({courseId,url,chapterId}:FileUploadProps) => {
    const handleUpload= async (result:any) =>{
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,{
            // imageUrl:result?.info?.secure_url,
            videoUrl:result?.info?.secure_url
        }).then((res) =>{
            toast.success("Video Updated Successfully")
        })
    }
    return(
        <Button variant={"default"} size={"lg"}>
            <CldUploadButton onSuccess={handleUpload} 
                uploadPreset="library"
            />
        </Button>
    )
}
export default VideoUpload