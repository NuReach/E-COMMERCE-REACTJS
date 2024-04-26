import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signinApi } from "@/api/UserApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "@/utils/Store";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function InputForm() {

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await signinMutation(data);
  }

  const { state , dispatch : ctxDispatch } = useContext(Store);
   

  const { mutateAsync : signinMutation } = useMutation({
    mutationFn : signinApi,
    onSuccess : (data) => {
      console.log(data);
      localStorage.setItem("userInfo",JSON.stringify(data));
      ctxDispatch({
        type: 'USER_SIGNIN',
        payload: { data },
    });
      navigate(`/`);
      toast.success("Signin Successfully");
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
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
