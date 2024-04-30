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
  

export default function ProductPagination({data}) {
    const {search} = useLocation();
    const key = new URLSearchParams(search);
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
                        <PaginationPrevious href={`/products?page=${page-1}`} />
                    }
                    </PaginationItem>
                    <PaginationItem className='flex'>
                    {
                        Array.from({ length: data?.pages || 0 }, (_, index) => index + 1).map((item, i) => (
                        
                            <PaginationLink key={i} href={`/products?page=${item}`}>{item}</PaginationLink> 
                            
                            ))
                    }
                    </PaginationItem>
                    <PaginationItem>
                    </PaginationItem>
                    <PaginationItem>
                    {
                        page == data?.pages ? ""
                        :
                        <PaginationNext href={`/products?page=${parseInt(page)+1}`} />
                    }
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        }
    </div>

  )
}
