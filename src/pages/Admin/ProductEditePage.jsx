import { getProductByID } from '@/api/ProductsApi';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ProductUpdateForm } from '@/components/ui/myComponents/ProductUpdateForm';
import UserNavbar from '@/components/ui/myComponents/UserNavbar';
import { proxy } from '@/utils/Utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProductEditePage() {
    const {id} = useParams();
    
    const {isLoading , isError, data:product} = useQuery({ 
        queryKey: ['product',{id}], 
        queryFn: async ()=>{
            try {
                const respone = await axios.get(`${proxy}/api/products/${id}`);
                return respone.data;
            } catch (error) {
                throw error;
            }
        } 
        });
    
        
        if (isLoading) {
            return <p>Loading..</p>
        }
        console.log(product);
        
  return (
    <div>
        <UserNavbar />
        <div className='flex justify-center items-center  p-3'>
            <Card className='w-full sm:w-96 lg:w-6/12 px-3 py-9'>
                <CardTitle>UPDATE PRODUCT </CardTitle>
                <CardDescription>Product ID : {id}</CardDescription>
                <div>
                    <ProductUpdateForm product={product}  />
                </div>
            </Card>
        </div>
    </div>
  )
}
