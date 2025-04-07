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
import { useState,useEffect } from "react";
import Modal from './Modal';
import { TextContainer } from './text-container';
import { Prompt } from '@/actions/prompt';
import getPrompts from '@/actions/retrievePrompts';

interface SettingsModalProps {
    isOpen?:boolean,
    onClose:() => void,
}

const Generativemodel = ({isOpen,onClose}:SettingsModalProps) => {
    const [loading,setLoading] = useState(false)
    const [title,setTitle] = useState("")
    const [messages, setMessages] = useState<{ prompt: string; response: string }[]>([])
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
        try{
            const response = await axios.post('/api/generate',values)
            const result = addNewLineBeforeBoldAndNumbers(response.data.output)
            await Prompt(values, { response: result })
            toast.success("Generated Successfully")
            setTitle(form.getValues("prompt"))
            form.reset();
        }catch{ 
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        const fetchPrompts = async () => {
            const prompts = await getPrompts();
            if (Array.isArray(prompts)) {
            setMessages(prompts.map(prompt => ({
                prompt: prompt.prompt,
                response: prompt.response
            })));
            }
        };
        fetchPrompts();
    }, [messages]);
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
            <div>
                <h1 className="text-2xl font-bold text-center">Generative Model</h1>
                <div className="max-h-[200px] overflow-y-auto border rounded-md p-4 mb-4">
                    <h3 className="text-sm font-medium mb-2">Previous Messages</h3>
                    <div className="space-y-2">
                        {messages?.map((message, index) => (
                            <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                                <p className="font-medium">{message.prompt}</p>
                                <p className="text-gray-600 text-xs">{message.response}</p>
                            </div>
                        ))}
                        {!messages?.length && (
                            <p className="text-sm text-gray-500">No previous messages</p>
                        )}
                    </div>
                </div>
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
        </Modal>
    )
}
export default Generativemodel


function addNewLineBeforeBoldAndNumbers(input:string):string {
    // Regular expression to add a newline before '**' and before numbers followed by a period
    return input
        .replace(/(\*\*|(?<!\.)\d+\.)/g, '\n$1')
        .replace(/^\n/, ''); // Remove leading newline if present
  }