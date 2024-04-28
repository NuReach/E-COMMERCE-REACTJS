import { getOrderByIdApi } from '@/api/OderApi';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import UserNavbar from '@/components/ui/myComponents/UserNavbar';
import { Store } from '@/utils/Store';
import { UseAuthRedirect } from '@/utils/UseAuthRedirect';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Check, Terminal } from 'lucide-react';
import React, { useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function OrderDetailPage() {
  UseAuthRedirect();
  const {id} = useParams();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const {isLoading , isError, data:order} = useQuery({ 
    queryKey: ['order',{id}], 
    queryFn: ()=>getOrderByIdApi(id,userInfo.token) 
  });
  if (isLoading) {
    return <p>Loading..</p>
  }
  return (
    <HelmetProvider>
    <Helmet>
        <title>Order Detail</title>
    </Helmet>
    <UserNavbar />
    <div className='flex flex-col justify-start items-center h-screen p-3'>
        <Card className=' w-full sm:w-96 lg:w-1/2 px-3 py-9'>
            <div>
                <CardTitle>Your Order Detail </CardTitle>
                <CardDescription>Order ID : {order?._id} </CardDescription>
            </div>
            <div className='flex mt-3 flex-col '>
                <div className='  flex flex-col gap-3'>
                    <Card className='p-3'>
                        <CardTitle className='text-lg'>Shipping</CardTitle>
                        <div className="flex justify-between mb-2 border-b-2 pb-1 mt-3 gap-3">
                            <span className="text-sm">Name</span>
                            <span className="font-semibold text-lg capitalize">{order?.shippingAddress.fullname}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1 gap-3">
                            <span className="text-sm">Address</span>
                            <span className="font-semibold text-lg capitalize line-clamp-1">{order?.shippingAddress.address},
                            {order?.shippingAddress.postalCode},
                            {order?.shippingAddress.city},
                            {order?.shippingAddress.country}
                            </span>
                        </div>
                      {
                        order?.isDelivererd ? 
                        <Alert>
                          <Check className="h-4 w-4" />
                          <AlertTitle>Already Deliver</AlertTitle>
                        </Alert>
                      :
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Not Deliverd</AlertTitle>
                        </Alert> 
                      }
                 
                    </Card>
                    <Card className='p-3'>
                        <CardTitle className='text-lg'>Payment</CardTitle>
                        <div className="flex items-center gap-3 mb-2 pb-1 mt-3">
                            <span className="text-sm">Method</span>
                            <span className="font-semibold text-lg capitalize">{order?.paymentMethod}</span>
                        </div>
                        {
                          order?.isPaid ? 
                          <Alert>
                            <Check className="h-4 w-4" />
                            <AlertTitle>Already Paid</AlertTitle>
                          </Alert>
                        :
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Not Paid</AlertTitle>
                          </Alert> 
                        }
                    </Card> 
                    <Card className='p-3'>
                        <CardTitle className='text-lg'>Purchased Items</CardTitle>
                        {
                            order?.orderItems.map((item,i)=>(
                                <div key={i} className="flex justify-between mb-2  pb-1 mt-3 items-center">
                                    <div className='flex items-center gap-3 w-48'>
                                        <img src={item.image} alt="" className='w-14 h-16' />
                                        <p>{item.name}</p>
                                    </div>
                                    <h5 className='text-xl w-9'>x{item.quantity}</h5>
                                    <h5 className='text-xl w-24'>${item.price.toFixed(2)}</h5>
                                </div>
                                    ))
                        }
                    </Card> 

                </div>
                <div className='mt-3'>
                    <Card className='p-3 w-full '>
                        <CardTitle className='text-lg'>Order summaary</CardTitle>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-sm">Item</span>
                            <span className="font-semibold text-lg">${order?.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-sm">Tax</span>
                            <span className="font-semibold text-lg">${order?.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-sm">Shipping</span>
                            <span className="font-semibold text-lg">${order?.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-lg font-bold">Total</span>
                            <span className="font-semibold text-lg">${order?.totalPrice.toFixed(2)}</span>
                        </div>
                    </Card>
                </div>
            </div>
        </Card>
    </div>
</HelmetProvider>
  )
}
