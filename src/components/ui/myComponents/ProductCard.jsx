import React, { useContext } from 'react'
import { Card, CardDescription, CardTitle } from '../card'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import RatingStar from './RatingStar'
import { Store } from '@/utils/Store'
import { toast } from 'sonner'

export default function ProductCard({data}) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartHandler = () => {
    const { cart } = state;
    const existItem = cart.cartItems.find((x) => x._id === data._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
        toast.error("Product Out Of Stock");
        return;
      }
    ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...data, quantity },
    });
};
  return (
    <Card className="w-[270px] p-3 ">
      <div  className='flex flex-col '>
        <Link to={`/products/${data._id}`}>
          <img className='w-full h-80 object-cover' src={data.image} alt="" />
        </Link>
        <Link to={`/products/${data._id}`} className='mt-3'>
          <CardTitle><div className='text-lg capitalize'>{data.name}</div></CardTitle>
          <CardDescription className='capitalize'>{data.slug}</CardDescription>
          <CardTitle className='text-lg'>{data.price}$</CardTitle>
          <RatingStar rating={data.rating} reviews={data.numReviews}/>
        </Link>
        <div className='w-full flex justify-end'>
          {
            data.countInStock == 0 ?
              <Button className=' magra text-xs' disabled variant="destructive">OUT OF STOCK</Button>
              :
              <Button className=' magra text-xs' onClick={addToCartHandler} variant="outline">ADD TO CART</Button>
          }
        </div>
      </div>
    </Card>
  )
}
