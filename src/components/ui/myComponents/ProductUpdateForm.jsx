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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { proxy } from "@/utils/Utils";
import { useContext } from "react";
import { Store } from "@/utils/Store";

export function ProductUpdateForm({product}) {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;


  const FormSchema = z.object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    slug: z.string().min(3, {
      message: "Slug must be at least 3 characters.",
    }),
    price: z.coerce.number().positive({
      message: "Price must be a positive number.",
    }),
    image: z.string(),
    category: z.string().min(1,{
        message: "Image URL is invalid.",
      }),
    countInStock: z.coerce.number().int().min(0, {
      message: "Count in stock must be a non-negative integer.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
  });



  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        name: product?.name || "" ,
        slug: product?.slug || "" ,
        price: Number(product?.price) || 0 ,
        image: product?.image || "" ,
        category: product?.category || "" ,
        countInStock: Number(product?.countInStock) || "" ,
        description: product?.description || "" ,
    },
  });

  const  onSubmit = async (data) => {
    await updateProductMutation(data);
  }

  const queryClient = useQueryClient();

  const { mutateAsync : updateProductMutation } = useMutation({
    mutationFn : async (state) => {
        try {
            const response = await axios.put(
                `${proxy}/api/products/update/${product?._id}`,
                {
                    name : state.name,
                    slug : state.slug,
                    price : state.price,
                    image : state.image,
                    category : state.category,
                    countInStock : state.countInStock,
                    description : state.description,
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
      queryClient.invalidateQueries(['product'])
      toast.success(res.message);
    },
    onError : (err) => {
      toast.error(err.message);
    }
  })

   
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number"  inputMode="numeric" placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countInStock"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Count in Stock</FormLabel>
              <FormControl>
                <Input type="number"  inputMode="numeric" placeholder="Count in Stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Update Product
        </Button>
      </form>
    </Form>
  );
}
