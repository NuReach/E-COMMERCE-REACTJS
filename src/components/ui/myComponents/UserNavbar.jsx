import { Store } from '@/utils/Store.jsx';
import React, { useContext } from 'react'
import { Badge } from '../badge';
import { Link } from 'react-router-dom';

export default function UserNavbar() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div className='bg-black p-3 flex justify-between items-center px-9'>
        <Link to={`/`}>
          <h1 className='text-white'>Amazona</h1>
        </Link>
        <div className='flex gap-9'>
          <Link to={`/products/cart`} className='flex relative'>
            <h5 className='text-white'>Cart</h5>
            {
              cart.cartItems.length > 0 &&
                <Badge className='bg-red-600 absolute -right-3 -top-4 w-6 h-6 rounded-full flex justify-center items-center'>{cart.cartItems.length}</Badge>
            }
          </Link>
          <Link to={`/signin`}>
             <h5 className='text-white'>Sign In</h5>
          </Link>
        </div>
    </div>
  )
}
