import { Button } from '@/components/ui/button';
import MyPagination from '@/components/ui/myComponents/MyPagination';
import ProductPagination from '@/components/ui/myComponents/ProductPagination';
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { Store } from '@/utils/Store';
import { UseAuthRedirect } from '@/utils/UseAuthRedirect'
import { proxy } from '@/utils/Utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Book, Edit, RemoveFormatting, Trash } from 'lucide-react';
import React, { useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

export default function ProductListPage() {
    const {search} = useLocation();
    const key = new URLSearchParams(search);
    const page = key.get('page') || 1; 
    const navigate = useNavigate(); 
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const {isLoading , isError, data:products} = useQuery({ 
    queryKey: ['products',{page}], 
    queryFn: async ()=>{
        try {
            const response = await axios.get(`${proxy}/api/products/admin/list?page=${page}`,{
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
//   if (isLoading) {
//     return <p>Loading...</p>
//   }
  return (
    <HelmetProvider>
        <Helmet>
            <title>{"Products"}</title>
        </Helmet>
        <UserNavbar />
        <div className='w-full flex justify-center '>
            <div className='w-10/12 mt-3 flex flex-col '>
                <div className='w-full flex my-3 justify-between'>
                    <h1>Product List</h1>
                    <Button onClick={()=>navigate('/products/create')}>Create</Button>
                </div>
                <div className='w-full rounded-lg p-3 border-2 flex flex-col gap-6'>
                    <div className='flex w-full justify-between gap-3 border-b-2 pb-3'>
                        <h5 className=' w-10 sm:w-44 lg:60 line-clamp-1 '>ID</h5>
                        <h5 className='w-36 line-clamp-1 hidden md:block'>Price</h5>
                        <h5 className='w-36 line-clamp-1 '>Name</h5>
                        <h5 className='w-36 line-clamp-1 '>Category</h5>
                        <h5 className='w-20 line-clamp-1 hidden md:block'>In Stock</h5>
                        <h5 className='w-36 line-clamp-1'>Action</h5>
                    </div>
                    {
                        products?.products.map((item,i)=>(
                            <div key={i} className='flex w-full justify-between gap-3'>
                                <p className=' w-10 sm:w-44 lg:60 line-clamp-1 '>{item._id}</p>
                                <p className='w-36 line-clamp-1 hidden md:block'>${item.price.toFixed(2)}</p>
                                <p className='w-36 line-clamp-1 '>{item.name}</p>
                                <p className='w-36 line-clamp-1'>{item.category}</p>
                                <p className='w-20 line-clamp-1 hidden md:block'>{item.countInStock} </p>
                                <div className='w-36 flex gap-3'>
                                    <Edit onClick={()=>navigate(`/products/edite/${item._id}`)} />
                                    <Dialog>
                                        <DialogTrigger>
                                            <Trash />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle >Are you absolutely want to delete this product ?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your product
                                                and remove your data from our servers.
                                            </DialogDescription> 
                                            </DialogHeader>
                                            <Button onClick={()=>{
                                                console.log("Item deleted");
                                                window.location.reload();
                                            }} variant='destructive' className='mt-3'>Delete</Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div> 
                        ))
                    }
                </div>
                <div className='w-full flex justify-end mt-3'>
                    <ProductPagination data={products} />
                </div>
            </div>
        </div>
    </HelmetProvider>
  )
}
