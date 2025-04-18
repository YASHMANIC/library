"use client"
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {ImageIcon, Pencil, PlusCircle} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Course} from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/file-upload";
import { ImageSchema } from '@/Schemas';

interface ImageFormProps{
         initialData:Course,
         courseId:string
}

const ImageForm = ({initialData, courseId}:ImageFormProps) => {
    const [isEditing,setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()
    const form = useForm<z.infer<typeof  ImageSchema>>({
        resolver:zodResolver(ImageSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || ""
        },
    })
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Image
                  <Button onClick={toggleEdit} variant={"ghost"}>
                      {isEditing && (
                    <>
                        Cancel
                    </>
                )}
                      {!isEditing && !initialData.imageUrl && (
                          <>
                              <PlusCircle className="h-4 w-4 mr-2"/>
                              Add an Image
                          </>
                      )}
                      {!isEditing && initialData.imageUrl &&(
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                    Edit Image
                    </>
                      )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className={"h-10 w-10 text-slate-500"}/>
                    </div>
                ) :(
                    <div className="relative aspect-video mt-2">
                    <Image src={initialData.imageUrl} alt={"Upload"} className="object-cover rounded-md" fill/>
                </div>)
            )}
            {isEditing && (
               <div>
                   <FileUpload courseId={courseId} url={form.getValues('imageUrl')}/>
                   <div className="text-xs text-muted-foreground mt-4">
                       16:9 Aspect Ratio Recommended
                   </div>
               </div>
            )}
        </div>
    )
}

export default ImageForm