import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { proxy } from '@/utils/Utils';
import axios from 'axios';
import SearchBar from './SearchBar';
  

export default function SheetLeft() {

  const {search} = useLocation();
    const key = new URLSearchParams(search);
    const query = key.get('query') || 'all';     
    const category = key.get('category') || 'all';     
    const min = key.get('min') || 'all';     
    const max = key.get('max') || 'all';     
    const rating = key.get('rating') || 'all';     
    const order = key.get('order') || 'newest';     
    const page = key.get('page') || 1;  

  const {data:categories} = useQuery({ 
    queryKey: ['categories'], 
    queryFn: async ()=>{
      const response = await axios.get(`${proxy}/api/products/get/categories`)
      return response.data;
    } 
  });


  return (
    <Sheet>
    <SheetTrigger className='text-white'>
      <Menu />
    </SheetTrigger>
    <SheetContent side='left'>
        <div className='my-3'>
          <SearchBar />
        </div>
        <SheetHeader>
        <SheetTitle>Category</SheetTitle>
        <SheetDescription>
            You can find product by its Category
        </SheetDescription>
        </SheetHeader>
        <div className='mt-3 gap-3 flex flex-col'>
          {
            categories?.map((item,i)=>(
            <Link  to={`/search/result?category=${item}&&query=${query}&&min=${min}&&max=${max}&&rating=${rating}&&order=${order}&&page=${page}`} key={i} className='border-b-2 cursor-pointer text-sm capitalize'>
                {item}
            </Link>
            ))
          }
        </div>
    </SheetContent>
    </Sheet>
  )
}
