import { dailogAnimation } from '@/utils/Animation';
import { Store } from '@/utils/Store';
import { AnimatePresence, motion } from 'framer-motion';
import { DatabaseIcon, PackageSearch, ShoppingBag } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

export default function AdminDropDown() {
  const [show,setShow] = useState(false);
  const { state , dispatch : ctxDispatch } = useContext(Store);
  const {userInfo} = state;
  const btn = () => {
    setShow(!show);
  }
  const logoutBtn = () => {
    ctxDispatch({
        type: 'USER_SIGNOUT'
    });
  }
  return (
    <div className='cursor-pointer relative'>
        <div onClick={btn} className='flex justify-center items-center'>
            <h5 className='text-white'>{userInfo.name}</h5>
            <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path d="M128 192l128 128 128-128z" fill="currentColor"/></svg>
        </div>
        <AnimatePresence>
            {
                show ? 
                <motion.div
                    variants={dailogAnimation}
                    initial = "hidden"
                    animate = "visible"
                    exit="exit"
                 className='w-48 rounded-lg shadow-lg absolute right-1 -bottom-[350px] border-2  bg-white p-1 gap-1 flex flex-col'>
                     <Link to={`/dashboard`}>
                        <div className='hover:bg-gray-100 p-3 rounded-lg flex  items-center justify-between'>
                            <h5 className=' text-gray-600'>Dashboard</h5>
                            <DatabaseIcon />
                        </div>
                    </Link>
                    <Link to={`/products`}>
                        <div className='hover:bg-gray-100 p-3 rounded-lg flex  items-center justify-between'>
                            <h5 className=' text-gray-600'>Products</h5>
                            <PackageSearch />
                        </div>
                    </Link>
                    <Link to={`/allOrders`}>
                        <div className='hover:bg-gray-100 p-3 rounded-lg flex  items-center justify-between'>
                            <h5 className='text-gray-600'> All Order</h5>
                            <ShoppingBag />
                        </div>
                    </Link>
                    <Link to={`/profile`}>
                        <div className='hover:bg-gray-100 p-3 rounded-lg flex  items-center justify-between'>
                            <h5 className=' text-gray-600'>Profile</h5>
                            <svg className=' text-gray-600' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13q-1.65 0-2.825-1.175T8 9V5.5q0-.625.438-1.062T9.5 4q.375 0 .713.175t.537.5q.2-.325.538-.5T12 4t.713.175t.537.5q.2-.325.538-.5T14.5 4q.625 0 1.063.438T16 5.5V9q0 1.65-1.175 2.825T12 13m-8 6v-.8q0-.85.438-1.562T5.6 15.55q1.55-.775 3.15-1.162T12 14t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 18.2v.8q0 .825-.587 1.413T18 21H6q-.825 0-1.412-.587T4 19"/></svg>
                        </div>
                    </Link>
                    <Link to={`/orders`}>
                        <div className='hover:bg-gray-100 p-3 rounded-lg flex  items-center justify-between'>
                            <h5 className='text-gray-600'> Your Order</h5>
                            <svg className='text-gray-600' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path fill="currentColor" d="M18.5 18.8v-2.3q0-.2-.15-.35T18 16t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.5 1.5q.15.15.35.15T20 21t.15-.35t-.15-.35zM12 12.85q.275 0 .525-.075t.475-.2l5.075-2.925q.35-.2.45-.612t-.1-.763t-.6-.45t-.75.1L12 10.85L6.925 7.925q-.35-.2-.75-.1t-.6.45t-.087.763t.462.612L11 12.575q.225.125.475.2t.525.075m-9 3.125v-7.95q0-.55.263-1T4 6.3l7-4.025q.25-.125.488-.2T12 2t.525.075t.475.2L20 6.3q.475.275.738.725t.262 1v3.4q0 .45-.375.7t-.8.125t-.888-.187T18 12q-2.9 0-4.95 2.05T11 19v.513q0 .237.05.437q.1.625-.363.975T9.726 21L4 17.7q-.475-.275-.737-.725t-.263-1M18 24q-2.075 0-3.537-1.463T13 19t1.463-3.537T18 14t3.538 1.463T23 19t-1.463 3.538T18 24"/></svg>
                        </div>
                    </Link>
                    <button onClick={logoutBtn}>
                        <div className='hover:bg-gray-100 p-3 flex  items-center justify-between mt-3 border-t-2'>
                            <h5 className='text-gray-600'>Logout</h5>
                            <svg className='text-gray-600' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75" clip-rule="evenodd"/><path fill="currentColor" d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C20.617 2 19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"/></svg>
                        </div>
                    </button>

                </motion.div>
                :
                ""
            }
        </AnimatePresence>
    </div>
  )
}
