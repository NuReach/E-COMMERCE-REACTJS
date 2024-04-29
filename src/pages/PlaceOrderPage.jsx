import { placeOrderApi } from '@/api/OderApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { Progress } from '@/components/ui/progress'
import { Store } from '@/utils/Store'
import { UseAuthRedirect } from '@/utils/UseAuthRedirect'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function PlaceOrderPage() {
    const navigate = useNavigate();
    const { state , dispatch : ctxDispatch } = useContext(Store);
    const { cart  } = state;
    const { userInfo } = state;
    const itemsPrice = (cart.cartItems.reduce((a,c)=>a + c.quantity * c.price , 0)).toFixed(2);
    const shippingPrice = (0).toFixed(2);
    const taxPrice = (itemsPrice * 0.15).toFixed(2);
    const subTotal = (parseFloat(itemsPrice) + parseFloat(shippingPrice) + parseFloat(taxPrice)).toFixed(2);
    const placeOrderBtn = async () => {
        if (cart.cartItems.length == 0) {
            toast.error("Please Add Items To Cart")
        }
        const obj = {
            orderItems : cart.cartItems,
            shippingAddress : cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice : itemsPrice,
            shippingPrice : shippingPrice,
            taxPrice : taxPrice,
            totalPrice : subTotal,
            token : userInfo.token,
        };
        await placeOrderMutation(obj);
    }
    const { mutateAsync : placeOrderMutation } = useMutation({
        mutationFn : placeOrderApi,
        onSuccess : (data) => {
          ctxDispatch({type:'CART_CLEAR'});
          navigate(`/orders/${data.order._id}`)
          toast.success(data.message);
        },
        onError : (err) => {
          toast.error(err.response.data.message);
        }
      })
  return (
    <HelmetProvider>
    <Helmet>
        <title>Place Order</title>
    </Helmet>
    <UserNavbar />
    <div className='flex flex-col justify-start items-center h-screen p-3'>
        <div className='w-full flex justify-center'>
            <Progress className=' sm:w-96 lg:w-1/2  my-6' value={100} />
        </div>
        <Card className=' w-full sm:w-96 lg:w-1/2 px-3 py-9'>
            <div>
                <CardTitle>Your Order Detail </CardTitle>
                <CardDescription>Please Review Your Order</CardDescription>
            </div>
            <div className='flex mt-3 flex-col '>
                <div className='  flex flex-col gap-3'>
                    <Card className='p-3'>
                        <CardTitle className='text-lg'>Shipping</CardTitle>
                        <div className="flex justify-between mb-2 border-b-2 pb-1 mt-3">
                            <span className="text-sm">Name</span>
                            <span className="font-semibold text-lg capitalize">{cart.shippingAddress.fullname}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1 ">
                            <span className="text-sm">Address</span>
                            <span className="font-semibold text-lg capitalize line-clamp-1">{cart.shippingAddress.address},
                            {cart.shippingAddress.postalCode},
                            {cart.shippingAddress.city},
                            {cart.shippingAddress.country}
                            </span>
                        </div>
                        <Badge className='cursor-pointer bg-yellow-600'>Edit</Badge>
                    </Card>
                    <Card className='p-3'>
                        <CardTitle className='text-lg'>Payment</CardTitle>
                        <div className="flex items-center gap-3 mb-2 pb-1 mt-3">
                            <span className="text-sm">Method</span>
                            <span className="font-semibold text-lg capitalize">{cart.paymentMethod}</span>
                        </div>
                        <Badge className='cursor-pointer bg-yellow-600'>Edit</Badge>
                    </Card> 
                    <Card className='p-3'>
                        <CardTitle className='text-lg'>Purchased Items</CardTitle>
                        {
                            cart.cartItems.map((item,i)=>(
                                <div key={i} className="flex justify-between mb-2  pb-1 mt-3 items-center">
                                    <div className='flex items-center gap-3 w-48'>
                                        <img src={item.image} alt="" className='w-14 h-16' />
                                        <p>{item.name}</p>
                                    </div>
                                    <h5 className='text-xl w-9'>x{item.quantity}</h5>
                                    <h5 className='text-xl w-12'>${item.price}</h5>
                                </div>
                                    ))
                        }
                        <Badge className='cursor-pointer bg-yellow-600'>Edit</Badge>
                    </Card> 

                </div>
                <div className='mt-3'>
                    <Card className='p-3 w-full '>
                        <CardTitle className='text-lg'>Order summaary</CardTitle>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-sm">Item</span>
                            <span className="font-semibold text-lg">${itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-sm">Tax</span>
                            <span className="font-semibold text-lg">${taxPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-sm">Shipping</span>
                            <span className="font-semibold text-lg">${shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b-2 pb-1">
                            <span className="text-lg font-bold">Total</span>
                            <span className="font-semibold text-lg">${subTotal}</span>
                        </div>
                        <Button onClick={placeOrderBtn} className='w-full bg-yellow-600'>Place Order</Button>
                    </Card>
                </div>
            </div>
        </Card>
    </div>
</HelmetProvider>
  )
}
