import { Store } from '@/utils/Store.jsx';
import React, { useContext } from 'react'
import { Badge } from '../badge';
import { Link } from 'react-router-dom';
import MyDropDown from './MyDropDown';
import SheetLeft from './SheetLeft';
import AdminDropDown from './AdminDropDown';


export default function UserNavbar() {
  const { state } = useContext(Store);
  const { cart } = state;
  const { userInfo } = state;
  return (
    <div className='bg-black p-3 flex justify-between items-center px-1 md:px-9'>
        <div className='flex gap-3'>
          <SheetLeft  />
          <Link to={`/`}>
            <h1 className='text-white text-lg sm:text-3xl'>Amazona</h1>
          </Link>
        </div>
        <div className='flex gap-9'>
          <Link to={`/products/cart`} className='flex relative'>
            <h5 className='text-white'>Cart</h5>
            {
              cart.cartItems.length > 0 &&
                <Badge className='bg-red-600 absolute -right-3 -top-4 w-6 h-6 rounded-full flex justify-center items-center'>{cart.cartItems.length}</Badge>
            }
          </Link>
          {
            userInfo == null ?
            <Link to={`/signin`}>
              <h5 className='text-white'>Sign In</h5>
            </Link>
            :
            (userInfo?.isAdmin == true 
            ?
            <AdminDropDown />
            :
            <MyDropDown />)
          }
        </div>
    </div>
  )
}
