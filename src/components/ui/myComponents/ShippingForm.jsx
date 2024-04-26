import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Store } from "@/utils/Store";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function ShippingForm() {

  const { state , dispatch : ctxDispatch } = useContext(Store);
  const { cart : {shippingAddress}} = state;
  const navigate = useNavigate();


  const FormSchema = z.object({
    fullname: z.string().min(3, {
      message: "Fullname must be at least 3 characters.",
    }),
    address: z.string().nonempty({
      message: "Address is required.",
    }),
    city: z.string().nonempty({
      message: "City is required.",
    }),
    postalCode: z.string().nonempty({
      message: "Postal Code is required.",
    }),
    country: z.string().nonempty({
      message: "Country is required.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        fullname: shippingAddress ? shippingAddress.fullname : "",
        address: shippingAddress ? shippingAddress.address : "",
        city: shippingAddress ? shippingAddress.city : "",
        postalCode: shippingAddress ? shippingAddress.postalCode : "",
        country: shippingAddress ? shippingAddress.country : "",
    },
  });

  function onSubmit(data) {
    ctxDispatch({
        type:"SAVE_SHIPPING_ADDRESS",
        payload : data
    })
    navigate("/payment")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input type="text"
                 placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Address"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
