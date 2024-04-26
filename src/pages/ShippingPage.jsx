import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import ShippingForm from '@/components/ui/myComponents/ShippingForm';
import UserNavbar from '@/components/ui/myComponents/UserNavbar';
import { Store } from '@/utils/Store';
import React, { useContext, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function ShippingPage() {
    const navigate = useNavigate();
    const { state , dispatch : ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(()=>{
      if (userInfo == null) {
        navigate("/signin");
      }
    },[userInfo,navigate])
  return (
    <HelmetProvider>
        <Helmet>
            <title>Shipping</title>
        </Helmet>
        <UserNavbar />
        <div className='flex justify-center items-center h-screen p-3'>
            <Card className=' w-96 lg:w-1/2 px-3 py-9'>
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
