"use client"

import toast from "react-hot-toast";
import axios from "axios";
import {CldUploadButton} from "next-cloudinary"
import { read } from "fs";
import { Button } from "./ui/button";

interface FileUploadProps{
    courseId:string,
    url:string
}


const FileUpload = ({courseId,url}:FileUploadProps) => {
    const handleUpload= async (result:any) =>{
        await axios.patch(`/api/courses/${courseId}`,{
            imageUrl:result?.info?.secure_url,
        }).then((res) =>{
            toast.success("Image Updated Successfully")
        })
    }
    return(
        <Button variant="default" className="w-full">
            <CldUploadButton onSuccess={handleUpload} options={{maxFiles:1}}
                uploadPreset="library"
            />
        </Button>
    )
}
export default FileUpload