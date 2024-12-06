"use client"

import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { PromptSchema } from "@/Schemas";
import { useState } from "react";
import Modal from './Modal';
import { TextContainer } from './text-container';

interface SettingsModalProps {
    isOpen?:boolean,
    onClose:() => void,
}

const Generativemodel = ({isOpen,onClose}:SettingsModalProps) => {
    
    const [output,setOuput] = useState("")
    const [loading,setLoading] = useState(false)
    const [title,setTitle] = useState("")
    const form = useForm<z.infer<typeof PromptSchema>>({
        resolver:zodResolver(PromptSchema),
        defaultValues:{
            prompt: "",
        }
    })
    const {isSubmitting,isValid} = form.formState
    const onSubmit = async (values:z.infer<typeof PromptSchema>) => {
        setLoading(true)
        setTitle("")
        setOuput("")
        try{
            const response = await axios.post('/api/generate',values)
            const result = addNewLineBeforeBoldAndNumbers(response.data.output)
            setOuput(result)
            toast.success("Generated Successfully")
            setTitle(form.getValues("prompt"))
            form.reset();
        }catch{
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
            <div>
                <h1 className="text-2xl">Enter The Question</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField control={form.control} name={"prompt"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Enter the Question</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder={"example"} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className=" flex justify-center items-center gap-x-2">
                            <Button type="submit" disabled={isSubmitting || !isValid}>
                                Send
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
           {loading && (
            <div className="flex justify-center text font-bold items-center mt-4">
                Wait A Moment
            </div>)}
            {output && (
                <>
                 <p className='text-center text-lg font-bold mt-3'>{title}</p>
                 <div className="text-wrap w-full mt-5">
                     <TextContainer text={output} />
                 </div>
                </>
                
            )}
        </Modal>
    )
}
export default Generativemodel


function addNewLineBeforeBoldAndNumbers(input:string):string {
    // Regular expression to add a newline before '**' and before numbers followed by a period
    let processedText = input.replace(/\*\*/g, '\n**'); // Add newline before **
    processedText = processedText.replace(/\d+\.\s*/g, (match) => `\n${match}`); // Add newline before numbers followed by period
    return processedText;
  }