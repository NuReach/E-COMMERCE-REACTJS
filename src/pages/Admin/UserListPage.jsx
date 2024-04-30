import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { Store } from '@/utils/Store';
import { UseAuthRedirect } from '@/utils/UseAuthRedirect'
import { proxy } from '@/utils/Utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Delete, Edit, Trash } from 'lucide-react';
import React, { useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function UserListPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const queryClient = useQueryClient();

  const {isLoading , isError, data:users} = useQuery({ 
    queryKey: ['users'], 
    queryFn: async ()=>{
        try {
            const response = await axios.get(`${proxy}/api/users/allUsers/list`,{
                headers : {
                    Authorization : `Bearer ${userInfo.token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
  });


  const { mutateAsync : deleteItemMutation } = useMutation({
    mutationFn : async (id)=>{
      try {
        const response = await axios.delete(`${proxy}/api/users/delete/${id}`,
          {
            headers : {
              Authorization : `Bearer ${userInfo.token}`
          }
          }
        )   ;
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess : () => {
      queryClient.invalidateQueries(['users']);
      toast.success("Deleted Successfully");
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
            <title>{"Users"}</title>
        </Helmet>
        <UserNavbar />
        <div className='w-full flex justify-center '>
            <div className='w-10/12 mt-3 flex flex-col '>
                <h1>Orders List</h1>
                <div className='w-full rounded-lg p-3 border-2 flex flex-col gap-6'>
                    <div className='flex w-full justify-between gap-3 border-b-2 pb-3'>
                        <h5 className=' w-10 sm:w-44 lg:60 line-clamp-1 '>ID</h5>
                        <h5 className='w-36 line-clamp-1 hidden md:block'>User</h5>
                        <h5 className='w-36 line-clamp-1 '>Email</h5>
                        <h5 className='w-36 line-clamp-1 '>Admin</h5>
                        <h5 className='w-36 line-clamp-1'>Action</h5>
                    </div>
                    {
                        users?.map((item,i)=>(
                            <div key={i} className='flex w-full items-center justify-between gap-3'>
                                <p className=' w-10 sm:w-44 lg:60 line-clamp-1 '>{item._id}</p>
                                <div className='w-36 line-clamp-1 hidden md:flex md:flex-col'>
                                 <p>{item.name || "DELETED USER"}</p>
                                 <p>{item.createdAt.slice(0,10)}</p>
                                </div>
                                <p className='w-36 line-clamp-1 '>${item.email}</p>
                                <p className='w-36 line-clamp-1'>{item.isAdmin ? "Yes" : "No" }</p>
                                <div className='w-36 line-clamp-1 flex gap-3'>
                                    <Link to={`/allUsers/edit/${item._id}`} ><Edit /></Link>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Trash />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle >Are you absolutely want to delete this product ?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your product
                                                and remove your data from our servers.
                                            </DialogDescription> 
                                            </DialogHeader>
                                            <Button onClick={ async()=>{
                                                await deleteItemMutation(item._id);
                                                window.location.reload();
                                            }} variant='destructive' className='mt-3'>Delete</Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div> 
                        ))
                    }
                </div>
            </div>
        </div>
    </HelmetProvider>
  )
}
