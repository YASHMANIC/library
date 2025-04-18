"use client"
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import { FormSchema } from '@/Schemas';
interface TitleFormProps{
    initialData:{
        title:string
    },
    courseId:string
}

const TitleForm = ({initialData, courseId}:TitleFormProps) => {
    const [isEditing,setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()
    const form = useForm<z.infer<typeof  FormSchema>>({
        resolver:zodResolver(FormSchema),
        defaultValues: initialData,
    })
    const {isSubmitting,isValid} = form.formState
    const onSubmit =async (values:z.infer<typeof FormSchema>) =>{
       try {
        await axios.patch(`/api/courses/${courseId}`,values)
           toast.success("Course Updated")
           toggleEdit()
           router.refresh()
       }catch{
           toast.error("Something Went Wrong")
       }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Title
                  <Button onClick={toggleEdit} variant={"ghost"}>
                      {isEditing ? (
                    <>
                        Cancel
                    </>
                ): (
                    <>
                        <Pencil className="h-4 w-4 mr-2"/>
                    Edit Title
                    </>
                      )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name={"title"}
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder={"e.g'Advanced Web Development'"} {...field}/>
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
export default TitleForm