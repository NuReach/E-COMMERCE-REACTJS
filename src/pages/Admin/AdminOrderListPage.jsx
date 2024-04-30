import { Button } from '@/components/ui/button';
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { Store } from '@/utils/Store';
import { UseAuthRedirect } from '@/utils/UseAuthRedirect'
import { proxy } from '@/utils/Utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom';

export default function AdminOrderListPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const {isLoading , isError, data:orders} = useQuery({ 
    queryKey: ['orders'], 
    queryFn: async ()=>{
        try {
            const response = await axios.get(`${proxy}/api/orders/allOrders/list`,{
                headers : {
                    Authorization : `Bearer ${userInfo.token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
  });
  console.log(orders);
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <HelmetProvider>
        <Helmet>
            <title>{"Orders"}</title>
        </Helmet>
        <UserNavbar />
        <div className='w-full flex justify-center '>
            <div className='w-10/12 mt-3 flex flex-col '>
                <h1>Orders List</h1>
                <div className='w-full rounded-lg p-3 border-2 flex flex-col gap-6'>
                    <div className='flex w-full justify-between gap-3 border-b-2 pb-3'>
                        <h5 className=' w-10 sm:w-44 lg:60 line-clamp-1 '>ID</h5>
                        <h5 className='w-36 line-clamp-1 hidden md:block'>User</h5>
                        <h5 className='w-36 line-clamp-1 '>Total</h5>
                        <h5 className='w-36 line-clamp-1 '>Paid</h5>
                        <h5 className='w-36 line-clamp-1 hidden md:block'>Delivered</h5>
                        <h5 className='w-36 line-clamp-1'>Action</h5>
                    </div>
                    {
                        orders?.map((item,i)=>(
                            <div key={i} className='flex w-full items-center justify-between gap-3'>
                                <p className=' w-10 sm:w-44 lg:60 line-clamp-1 '>{item._id}</p>
                                <div className='w-36 line-clamp-1 hidden md:flex md:flex-col'>
                                 <p>{item.user?.name || "DELETED USER"}</p>
                                 <p>{item.createdAt.slice(0,10)}</p>
                                </div>
                                <p className='w-36 line-clamp-1 '>${item.totalPrice.toFixed(2)}</p>
                                <p className='w-36 line-clamp-1'>{item.isPaid ? item.paidAt.slice(0,10) : "No" }</p>
                                <p className='w-36 line-clamp-1 hidden md:block'>{item.isDelivered ? "Yes" : "No"} </p>
                                <Link to={`/orders/${item._id}`} className='w-36 line-clamp-1'><Button className='text-xs h-6'>Detail</Button></Link>
                            </div> 
                        ))
                    }
                </div>
            </div>
        </div>
    </HelmetProvider>
  )
}
