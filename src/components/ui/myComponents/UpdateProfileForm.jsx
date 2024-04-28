import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import { proxy } from "@/utils/Utils";
import { toast } from "sonner";


export function UpdateProfileForm() {

const { state, dispatch: ctxDispatch } = useContext(Store);
const { userInfo } = state;


const FormSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Passwords must match!",
    })
    }).refine(
        (values) => {
          return values.password === values.confirmPassword;
        },
        {
          message: "Passwords must match!",
          path: ["confirmPassword"],
        }
      );;
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: userInfo?.name,
      email: userInfo?.email,
      password: "",
      confirmPassword: "",
    },
  });

  const  onSubmit = async (data) => {
    await updateUserMutation(data);
  }

  
  const { mutateAsync : updateUserMutation } = useMutation({
    mutationFn : async (state) => {
        try {
            const response = await axios.put(
                `${proxy}/api/users/profile`,
                {
                    name : state.username,
                    email : state.email,
                    password : state.password,
                },
                {
                    headers : {
                      Authorization : `Bearer ${userInfo.token}`
                  }
                }
            );
            return response.data;
            
        } catch (error) {
            throw error;
        }
    },
    onSuccess : (res) => {
        ctxDispatch({
                type: 'USER_SIGNIN',
                payload:  res ,
            });
      toast.success("Updated Successfully");
    },
    onError : (err) => {
      toast.error(err.response.data.message);
    }
  })


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
}
