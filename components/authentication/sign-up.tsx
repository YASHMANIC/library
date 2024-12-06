"use client"

import * as z from "zod"
import { useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input"; 
import {Button} from "../ui/button";
import {Register} from "../../actions/register";
import { RegisterSchema } from "../../Schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import generateToken from "@/lib/generateToken";
import { sendVerification } from "@/actions/sendVerification";
import Link from "next/link";


const RegisterForm = () => {
    const [isPending,startTransition] = useTransition()
     const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    });

    const onSubmit = (values:z.infer<typeof RegisterSchema>) => {
            localStorage.setItem("email",values.email);
            startTransition(()=>{
            Register(values).then((data) => {
                if(data.error){
                    setError(data.error);
                }
                if(data.success){
                setSuccess(data.success);
                sendVerification(values.email,generateToken());
                window.location.assign("/otpPage")
                }
            })
        })
    }
    return(
        <div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
        <div className=" space-y-4 bg-white px-6 py-8 shadow sm:rounded-lg sm:px-10">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name={"name"}
                       render={({field}) => (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                                       <FormControl>
                                           <Input type= {"text"} placeholder={"Example"} disabled={isPending} {...field}/>
                                       </FormControl>
                                       <FormMessage/>
                           </FormItem>
                       )}
                    />
                    <FormField control={form.control} name={"email"}
                       render={({field}) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                                       <FormControl>
                                           <Input type={"email"} placeholder="example@gmail.com" disabled={isPending} {...field}/>
                                       </FormControl>
                                       <FormMessage/>
                           </FormItem>
                       )}
                    />
                    <FormField control={form.control} name={"password"}
                       render={({field}) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                                       <FormControl>
                                           <Input type={"password"} placeholder={"******"} disabled={isPending} {...field}/>
                                       </FormControl>
                                       <FormMessage/>
                           </FormItem>
                       )}
                    />
                   <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <div>
                    <Link href={"/sign-in"}>
                        <p className="text-center text-sm font-normal text-muted-foreground">{"Already have an account"}</p>
                    </Link>
                </div>
                      <Button className="w-full" disabled={isPending} size="icon" variant="default">
                            SignUp
                      </Button>
                </form>
            </Form>
        </div>
    </div>
    )
}
export default RegisterForm