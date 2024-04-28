import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { InputForm } from '@/components/ui/myComponents/InputForm'
import { RegisterForm } from '@/components/ui/myComponents/RegisterForm'
import { UpdateProfileForm } from '@/components/ui/myComponents/UpdateProfileForm'
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { UseAuthRedirect } from '@/utils/UseAuthRedirect'
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function ProfilePage() {
    UseAuthRedirect();
  return (
    <HelmetProvider>
        <Helmet>
            <title>Signin Page</title>  
        </Helmet>
        <UserNavbar />
        <div className='flex justify-center items-center h-screen p-3'>
            <Card className='w-96 lg:w-6/12 px-3 py-9'>
            <CardTitle>YOUR PROFILE</CardTitle>
            <CardDescription>CLICK UPDATE BUTTON TO SAVE YOUR PRFILE !!</CardDescription>
            <div className='mt-3'>
                <UpdateProfileForm />
            </div>
            </Card>
        </div>
    </HelmetProvider>
  )
}
