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
import { useContext, useState } from "react";
import { Store } from "@/utils/Store";
import { useNavigate } from "react-router-dom";

export function ProductCreateForm() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [image,setImage] = useState("no_image");
    const navigate = useNavigate();
  
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
      image_link : z.string(),
      category: z.string().min(1,{
        message: "Category is invalid.",
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
        name: "",
        slug: "",
        price: 0,
        image_link: image ? image : "No Image", 
        category: "",
        countInStock: 0,
        description: "",
      },
    });
  
    const onSubmit = async (data) => {
      data.image_link = image;
      await createProductMutation(data);
    };
  
    const queryClient = useQueryClient();
  
    const { mutateAsync: createProductMutation } = useMutation({
      mutationFn: async (state) => {
        try {
          const response = await axios.post(
            `${proxy}/api/products/create`,
            {
              name: state.name,
              slug: state.slug,
              price: state.price,
              image: state.image_link,
              category: state.category,
              countInStock: state.countInStock,
              description: state.description,
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(["product"]);
        toast.success(res.message);
        navigate('/products')
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      try {
        setImage("Loading")
        const { data } = await axios.post(`${proxy}/api/upload/image`, bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        });  
        toast.success('Image uploaded successfully');
        setImage(data.secure_url);
      } catch (err) {
        toast.error(err);
      }
    };

    console.log(image);
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
                  <Input type="number" inputMode="numeric" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <p htmlFor="picture">Iamge</p>
            <Input id="picture" type="file" onChange={uploadFileHandler} />
          </div>

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
                  <Input type="number" inputMode="numeric" placeholder="Count in Stock" {...field} />
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
          <Button disabled={image == "Loading"} type="submit" className="w-full">
            Create Product
          </Button>
        </form>
      </Form>
    );
  }
  