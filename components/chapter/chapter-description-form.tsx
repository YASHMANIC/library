"use client"
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Chapter} from "@prisma/client";
import Editor from "@/components/editor";
import Preview from "@/components/preview";
import { ChapterDescription } from '@/Schemas';


interface ChapterDescriptionFormProps{
         initialData:Chapter,
    courseId:string,
    chapterId:string
}

const ChapterDescriptionForm = ({initialData, courseId,chapterId}:ChapterDescriptionFormProps) => {
    const [isEditing,setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()
    const form = useForm<z.infer<typeof ChapterDescription>>({
        resolver:zodResolver(ChapterDescription),
        defaultValues: {
            description: initialData?.description || ""
        },
    })
    const {isSubmitting,isValid} = form.formState
    const onSubmit =async (values:z.infer<typeof ChapterDescription>) =>{
       try {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values)
           toast.success("Chapter Description Updated")
           toggleEdit()
           router.refresh()
       }catch{
           toast.error("Something Went Wrong")
       }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Description
                  <Button onClick={toggleEdit} variant={"ghost"}>
                      {isEditing ? (
                    <>
                        Cancel
                    </>
                ): (
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                    Edit description
                    </>
                      )}
                </Button>
            </div>
            {!isEditing && (
                <div className={cn("text-sm mt-2",!initialData.description && "text-slate-500 italic")}>
                    {!initialData.description && "No description"}
                    {initialData.description && (
                        <Preview value={initialData.description}/>
                    )}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name={"description"}
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Editor disabled={isSubmitting} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type={"submit"}>
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
export default ChapterDescriptionForm