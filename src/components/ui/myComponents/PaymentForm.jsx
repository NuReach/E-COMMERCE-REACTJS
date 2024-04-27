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
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import { useNavigate } from "react-router-dom";

export function PaymentForm() {

    const { state , dispatch : ctxDispatch } = useContext(Store);
    const { cart : {paymentMethod}} = state;
    const navigate = useNavigate();
    console.log(paymentMethod);

  const FormSchema = z.object({
    paymentMethod: z.string().nonempty({
      message: "Please select a payment method.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymentMethod: paymentMethod ? paymentMethod : "", // Set an empty default value
    },
  });

  const onSubmit = async (data) => {
    ctxDispatch({
        type : "ADD_PAYMENT_METHOD",
        payload : data.paymentMethod
    })
    navigate("/")
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="paymentMethod" // Ensure the name matches the schema field
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange} // Use field.onChange for updates
                  defaultValue={field.value} // Set default value from form
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="paypal" />
                    </FormControl>
                    <FormLabel className="font-normal">PayPal</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="stripe" />
                    </FormControl>
                    <FormLabel className="font-normal">Stripe</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end mt-3">
          <Button className="w-32" type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
