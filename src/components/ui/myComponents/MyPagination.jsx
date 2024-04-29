import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useLocation } from 'react-router-dom';
  

export default function MyPagination({data}) {
    const {search} = useLocation();
    const key = new URLSearchParams(search);
    const query = key.get('query') || 'all';     
    const category = key.get('category') || 'all';     
    const min = key.get('min') || 'all';     
    const max = key.get('max') || 'all';     
    const rating = key.get('rating') || 'all' ;     
    const order = key.get('order') || 'newest';     
    const page = key.get('page') || 1;  
  return (
    <div>
        {
            data?.pages > 1 &&
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    {
                        page == 1 ? "" 
                        : 
                        <PaginationPrevious href={`/search/result?category=${category}&&query=${query}&&min=${min}&&max=${max}&&rating=${rating}&&order=newest&&page=${page-1}`} />
                    }
                    </PaginationItem>
                    <PaginationItem className='flex'>
                    {
                        Array.from({ length: data?.pages || 0 }, (_, index) => index + 1).map((item, i) => (
                            <>
                            <PaginationLink key={i} href={`/search/result?category=${category}&&query=${query}&&min=${min}&&max=${max}&&rating=${rating}&&order=newest&&page=${item}`}>{item}</PaginationLink> 
                            </>
                            ))
                    }
                    </PaginationItem>
                    <PaginationItem>
                    </PaginationItem>
                    <PaginationItem>
                    {
                        page == data?.pages ? ""
                        :
                        <PaginationNext href={`/search/result?category=${category}&&query=${query}&&min=${min}&&max=${max}&&rating=${rating}&&order=newest&&page=${parseInt(page)+1}`} />
                    }
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        }
    </div>

  )
}
