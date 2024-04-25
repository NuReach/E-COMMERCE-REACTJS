import { getAllProductsApi } from '@/api/ProductsApi'
import ProductCard from '@/components/ui/myComponents/ProductCard'
import { SkeletonCard } from '@/components/ui/myComponents/SkeletonCard'
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function HomePage() {
  const {isLoading , isError, data:products} = useQuery({ 
      queryKey: ['products'], 
      queryFn: getAllProductsApi 
    });
    
  if (isLoading) {
    return <div>
            <UserNavbar />
            <div className='px-24 py-9'>
                <h3>Featur Product</h3>
                <div className='p-3 grid gap-9 items-center justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-9'>
                  {
                    products?.map((item,i)=>(
                      <SkeletonCard key={i} />
                    ))
                  }
                </div>
            </div>
        </div>
  }  

  console.log(isLoading);
    
  return (
    <div>
        <UserNavbar />
        <div className='px-24 py-9'>
            <h3>Featur Product</h3>
            <div className='p-3 grid gap-9 items-center justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-9'>
              {
                products?.map((item,i)=>(
                  <ProductCard key={i} data={item} />
                ))
              }
            </div>
        </div>
    </div>
  )
}
