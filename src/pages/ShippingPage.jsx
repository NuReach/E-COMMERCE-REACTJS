import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import ShippingForm from '@/components/ui/myComponents/ShippingForm';
import UserNavbar from '@/components/ui/myComponents/UserNavbar';
import { Progress } from '@/components/ui/progress';
import { Store } from '@/utils/Store';
import { UseAuthRedirect } from '@/utils/UseAuthRedirect';
import React, { useContext, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function ShippingPage() {
  return (
    <HelmetProvider>
        <Helmet>
            <title>Shipping</title>
        </Helmet>
        <UserNavbar />
        <div className='flex flex-col justify-start items-center h-screen p-3'>
            <Progress className=' sm:w-96 lg:w-1/2  my-6' value={50} />
            <Card className=' sm:w-96 lg:w-1/2 px-3 py-9'>
                <CardTitle>Shipping Address </CardTitle>
                <CardDescription>Please Complete Your Address To Amazona !!</CardDescription>
                <div className='mt-3'>
                <ShippingForm />
                </div>
            </Card>
        </div>
    </HelmetProvider>
  )
}
