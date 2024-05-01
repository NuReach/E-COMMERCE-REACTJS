import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Store } from "@/utils/Store";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeafletMap from "./LeafletMap";

export default function ShippingForm() {

  const { state , dispatch : ctxDispatch } = useContext(Store);
  const { cart : {shippingAddress}} = state;
  const [location ,setLocation] = useState(null);
  const [locationLink , setLocationLink] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    setLocationLink(`https://www.google.com/maps?q=${location?.lat},${location?.lng}`)
  },[location]);

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
    location : z.string(),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        fullname: shippingAddress ? shippingAddress.fullname : "",
        address: shippingAddress ? shippingAddress.address : "",
        city: shippingAddress ? shippingAddress.city : "",
        postalCode: shippingAddress ? shippingAddress.postalCode : "",
        country: shippingAddress ? shippingAddress.country : "",
        location : shippingAddress ? shippingAddress.location : "",
    },
  });


  function onSubmit(data) {
    data.location = locationLink;
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
        {
          location &&
          <div>
          <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input type="text" disabled placeholder={locationLink}
              {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
                  )}
        />
        <p className="mt-3 pl-3">{locationLink}</p>
        </div>
        }

        <LeafletMap setLocation={setLocation} />
        <div className="w-full flex justify-end">
          <Button type="submit" className=" w-32">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
