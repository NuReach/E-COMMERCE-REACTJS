import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { InputForm } from '@/components/ui/myComponents/InputForm'
import { RegisterForm } from '@/components/ui/myComponents/RegisterForm'
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { UserUpdateForm } from '@/components/ui/myComponents/UserUpdateForm'
import { Store } from '@/utils/Store'
import { proxy } from '@/utils/Utils'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const {id} = useParams();

  const {isLoading , isError, data:user} = useQuery({ 
    queryKey: ['user',{id}], 
    queryFn: async ()=>{
        try {
            const respone = await axios.get(`${proxy}/api/users/${id}`,
            {
                headers : {
                  Authorization : `Bearer ${userInfo.token}`
            }
            }
        );
            return respone.data;
        } catch (error) {
            throw error;
        }
    } 
  });

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
        <UserNavbar />
        <div className='flex justify-center items-center h-screen p-3'>
        <Card className='w-96 px-3 py-9'>
            <CardTitle>UPDATE ACCOUNT </CardTitle>
            <CardDescription>Account ID : {id}</CardDescription>
            <div className='mt-3'>
            <UserUpdateForm user={user}/>
            </div>
        </Card>
        </div>
    </div>
  )
}
