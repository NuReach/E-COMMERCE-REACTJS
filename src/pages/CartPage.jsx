import { getProductByID } from '@/api/ProductsApi';
import { Button } from '@/components/ui/button';
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { Store } from '@/utils/Store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const { state , dispatch : ctxDispatch } = useContext(Store);
    const { cart } = state;
    const navigate = useNavigate();

    const updateCartItem = async (item,quantity) =>{
        const id = item._id;
        const {data} = await axios.get(`http://localhost:3000/api/products/${id}`)
          if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
          }
          ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };

    const removeCartItem = (item)=>{
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload:  item ,
        });
    };

    const checkOutBtn = ()=>{
        navigate(`/signin?redirect=/shipping`);
    }
  return (
    <div>
        <UserNavbar />
        <div className=' px-1 md:px-9 lg:px-24 py-9 magra'>
            <h3>Shopping Cart</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className='bg-white rounded-lg shadow-md p-6 mb-4 sm:hidden'>
                            {
                                cart?.cartItems.length > 0 &&
                                cart?.cartItems.map((item,i)=>(
                                    <div key={i} className="flex items-center border-b pb-3 pt-3">
                                        <img className="h-16 w-16 mr-4" src={item.image} alt="Product image" />
                                        <div className='gap-1 flex flex-col'>
                                            <span className="font-semibold">{item.name}</span>
                                            <div className='flex gap-3'>
                                                <h5>Price : </h5>
                                                <h5>{item.price}$</h5>
                                            </div>
                                            <div className="flex items-center">
                                                <button disabled={item.quantity == 1} onClick={()=>updateCartItem(item,item.quantity-1)}  className="border rounded-md py-2 px-4 mr-2">-</button>
                                                <span className="text-center w-8">{item.quantity}</span>
                                                <button disabled={item.quantity == item.countInStock} onClick={()=>updateCartItem(item,item.quantity+1)} className="border rounded-md py-2 px-4 ml-2">+</button>
                                            </div>
                                            <div className='flex gap-3'>
                                                <h5>Total : </h5>
                                                <h5>${item.price * item.quantity}</h5>
                                            </div>
                                            <div>
                                            <Button onClick={()=>removeCartItem(item)}>Delete</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4 hidden sm:block">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold ">Product</th>
                                    <th className="text-left font-semibold">Price</th>
                                    <th className="text-left font-semibold">Quantity</th>
                                    <th className="text-left font-semibold">Total</th>
                                    <th className="text-left font-semibold">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                cart?.cartItems.length > 0 &&
                                cart?.cartItems.map((item,i)=>(
                                    <tr key={i} className=''>
                                        <td className="py-4">
                                        <div className="flex items-center">
                                            <img className="h-16 w-16 mr-4" src={item.image} alt="Product image" />
                                            <span className="font-semibold">{item.name}</span>
                                        </div>
                                        </td>
                                        <td className="py-4">${item.price}</td>
                                        <td className="py-4">
                                        <div className="flex items-center">
                                            <button disabled={item.quantity == 1} onClick={()=>updateCartItem(item,item.quantity-1)} className="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span className="text-center w-8">{item.quantity}</span>
                                            <button disabled={item.quantity == item.countInStock} onClick={()=>updateCartItem(item,item.quantity+1)} className="border rounded-md py-2 px-4 ml-2">+</button>
                                        </div>
                                        </td>
                                        <td className="py-4">${item.price * item.quantity}</td>
                                        <td className="py-4"><Button  onClick={()=>removeCartItem(item)}>Delete</Button></td>
                                        
                                    </tr>
                                )) 
                            }
                            </tbody>
                        </table>
                            {
                                cart?.cartItems.length == 0 &&
                                <div className='h-96 flex justify-center items-center '>
                                    <h3>No Cartitems !!</h3>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary ( {cart?.cartItems.reduce((a,c)=>a + c.quantity, 0)} items )</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${cart?.cartItems.reduce((a,c)=>a + c.quantity * c.price , 0)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">$21.98</span>
                        </div>
                        <button onClick={checkOutBtn} className="bg-orange-600 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                        </div>
                    </div>
                    </div>
        </div>
    </div>
  )
}
