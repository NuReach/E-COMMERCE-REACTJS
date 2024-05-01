import { getProductByID } from '@/api/ProductsApi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MyPageTitle from '@/components/ui/myComponents/MyPageTitle';
import RatingStar from '@/components/ui/myComponents/RatingStar';
import UserNavbar from '@/components/ui/myComponents/UserNavbar';
import { Store } from '@/utils/Store';
import { UseAuthRedirect } from '@/utils/UseAuthRedirect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';
import { proxy } from '@/utils/Utils';
  

export default function ProductPage() {
    const {id} = useParams();
    const [rating , setRating] = useState("");
    const [cmt, setCmt] = useState("");
    const queryClient = useQueryClient();
    const {isLoading , isError, data:product} = useQuery({ 
      queryKey: ['product',{id}], 
      queryFn: ()=>getProductByID(id) 
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const addToCartHandler = () => {
        const { cart } = state;
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
          }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
    };


    const submitBtn = async (e) => {
        e.preventDefault();
        if (!cmt || !rating) {
          toast.error('Please enter comment and rating');
          return;
        }
        await createCmtMutation();
      };
  
      const { mutateAsync : createCmtMutation } = useMutation({
        mutationFn : async ()=>{
          try {
            const response = await axios.post(`${proxy}/api/products/${product._id}/reviews`,
            { rating, cmt, name: userInfo.name },
              {
                headers : {
                  authorization : `Bearer ${userInfo.token}`
              }
              }
            )
            return response.data;
          } catch (error) {
            throw error;
          }
        },
        onSuccess : (data) => {
          queryClient.invalidateQueries(['product']);
          toast.success('Review submitted successfully');
          product.reviews.unshift(data.review);
          product.numReviews = data.numReviews;
          product.rating = data.rating;
          window.scrollTo({
            behavior: 'smooth',
            top: reviewsRef.current.offsetTop,
          });
        },
        onError : (err) => {
          toast.error(err.response.data.message);
        }
      })


    if (isLoading) {
        return <p>Loading...</p>
    }

  return (
    <HelmetProvider>
        <Helmet>
            <title>{product ? product.name : "Product"}</title>
        </Helmet>
        <UserNavbar />
        <div className='flex flex-wrap justify-center items-center gap-3  mt-12 p-3' >
            <div>
                <img className='w-96' src={product?.image} alt="" />
            </div>
            <div className='flex flex-col gap-3 w-full lg:w-96'>
                <div className='border-b-2'>
                    <h3>{product?.name}</h3>
                </div>
                <div className='border-b-2'>
                    <RatingStar rating={product?.rating} reviews={product?.numReviews}  />
                </div>
                <div className='flex gap-3'>
                    <h5>Description  </h5>
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
                        <Button onClick={addToCartHandler} className='bg-yellow-600 hover:bg-yellow-700'>ADD TO CART</Button>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex w-full justify-center mb-9 flex-col items-center p-6'>
           <div className='lg:w-1/2 mt-3 gap-3 flex flex-col'>
                <MyPageTitle title={"Review"} />
                {
                    product?.reviews.map((item,i)=>(
                    <div key={i} className='border-2 rounded-lg p-3'>
                        <h5>{item.name}</h5>
                        <RatingStar rating={item.rating} reviews={"Star"} />
                        <p>{item.createdAt.slice(0,10)}</p>
                        <h5>Comment</h5>
                        <p>{item.comment}</p>
                  
                    </div>
                    ))
                }
           </div>
           {
             userInfo &&
            <div className='lg:w-1/2 mt-3'>
                    <MyPageTitle title={"Write A Customer Review"} />
                    <div className='border-2 rounded-lg p-3 flex flex-col gap-3'>
                        <h5>Rating</h5>
                        <select className='text-xs p-3' onChange={(e)=>setRating(e.target.value)} value={rating}>
                            <option >Choose Rating</option>
                            <option value="1">Very Bad</option>
                            <option value="2">Not Good</option>
                            <option value="3">Good</option>
                            <option value="4">Very Good</option>
                            <option value="5">Excellence</option>
                        </select>
                        <h5>Comment</h5>
                        <textarea className='border-2 rounded-lg p-3 text-xs h-24' onChange={(e)=>setCmt(e.target.value)} placeholder='Your Message...'></textarea>
                        <Button onClick={submitBtn}>Submit</Button>
                    </div>
            </div>
           }
        </div>
        
    </HelmetProvider>
  )
}
