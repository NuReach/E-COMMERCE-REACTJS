import { getProductBySlug } from '@/api/ProductsApi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatingStar from '@/components/ui/myComponents/RatingStar';
import UserNavbar from '@/components/ui/myComponents/UserNavbar';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProductPage() {
    const {slug} = useParams();
    const {isLoading , isError, data:product} = useQuery({ 
      queryKey: ['product',{slug}], 
      queryFn: ()=>getProductBySlug(slug) 
    });

console.log(product);
  
  return (
    <div>
        <UserNavbar />
        <div className='flex flex-wrap justify-center items-center gap-3 h-screen'>
            <div>
                <img className='w-96' src={product?.image} alt="" />
            </div>
            <div className='flex flex-col gap-3'>
                <div className='border-b-2'>
                    <h3>{product?.name}</h3>
                </div>
                <div className='border-b-2'>
                    <RatingStar rating={product?.rating} reviews={product?.numReviews}  />
                </div>
                <div className='flex gap-3'>
                    <h5>Description : </h5>
                    <p>{product?.description}</p>
                </div>
                <div className='border p-3 flex flex-col gap-3 h-fit'>
                    <div className='flex gap-3'>
                        <h5>Price : </h5>
                        <h5>{product?.price}$</h5>
                    </div>
                    <div className='flex gap-3'>
                        <h5>Status : </h5>
                        {
                            product?.countInStock > 0 ?
                            <Badge className='bg-green-600'>Instock</Badge> 
                            :
                            <Badge className='bg-red-600'>Out Of Stock</Badge>
                        }
                    </div>
                    <div>
                        <Button className='bg-yellow-600 hover:bg-yellow-700'>ADD TO CART</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
