import React from 'react'
import { Card, CardDescription, CardTitle } from '../card'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import RatingStar from './RatingStar'

export default function ProductCard({data}) {
  return (
    <Card className="w-[270px] p-3 ">
      <Link to={`/products/${data.slug}`} className='flex flex-col '>
        <div>
          <img className='w-full h-80 object-cover' src={data.image} alt="" />
        </div>
        <div className='mt-3'>
          <CardTitle><div className='text-lg capitalize'>{data.name}</div></CardTitle>
          <CardDescription className='capitalize'>{data.slug}</CardDescription>
          <CardTitle className='text-lg'>{data.price}$</CardTitle>
          <RatingStar rating={data.rating} reviews={data.numReviews}/>
        </div>
        <div className='w-full flex justify-end'>
          <Button className='w-32 magra-regular'  variant="outline">ADD TO CART</Button>
        </div>
      </Link>
    </Card>
  )
}
