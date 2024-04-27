import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { PaymentForm } from '@/components/ui/myComponents/PaymentForm';
import UserNavbar from '@/components/ui/myComponents/UserNavbar';
import { Progress } from '@/components/ui/progress';
import { UseAuthRedirect } from '@/utils/UseAuthRedirect'
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function PaymentPage() {
  UseAuthRedirect();
  return (
    <HelmetProvider>
        <Helmet>
            <title>Payment</title>
        </Helmet>
        <UserNavbar />
        <div className='flex flex-col justify-start items-center h-screen p-3'>
            <Progress className=' sm:w-96 lg:w-1/2  my-6' value={75} />
            <Card className=' sm:w-96 lg:w-1/2 px-3 py-9'>
                <CardTitle>Select Your Payment </CardTitle>
                <CardDescription>Please Select One Of This !!</CardDescription>
                <div className='mt-3'>
                    <PaymentForm />
                </div>
            </Card>
        </div>
    </HelmetProvider>
  )
}
