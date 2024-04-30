import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState } from "react";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { proxy } from "@/utils/Utils";
import { toast } from "sonner";
import { Store } from "@/utils/Store";


export function UserUpdateForm({user}) {

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
    }),
    isAdmin: z.string()
    .refine((value) => value === "admin" || value === "user", {
      message: "Value must be a boolean",
    })
    .transform((value) => value === "admin"),
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.name,
      email: user?.email,
      password: "" ,
      confirmPassword: "",
      isAdmin: user?.isAdmin ? 'admin' : 'user', 
    },
  });

  async function onSubmit(data) {
    await updateUserMutation(data);
  }

  const { mutateAsync : updateUserMutation } = useMutation({
    mutationFn : async (state) => {
        try {
            const response = await axios.put(
                `${proxy}/api/users/${user._id}`,
                {
                    name : state.username,
                    email : state.email,
                    isAdmin : state.isAdmin,
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
      toast.success(res.message);
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
          name="isAdmin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger >
                    <SelectValue  placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
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
