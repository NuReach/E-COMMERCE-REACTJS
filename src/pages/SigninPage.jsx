import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { InputForm } from '@/components/ui/myComponents/InputForm'
import { Store } from '@/utils/Store'
import { UseAuthRedirect } from '@/utils/UseAuthRedirect'
import React, { useContext, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

export default function SigninPage() {
  const navigate = useNavigate();
  const createAccBtn = ()=>{
    navigate(`/register`);
  }

  return (
    <HelmetProvider>
        <Helmet>
            <title>Signin Page</title>  
        </Helmet>
      <div className='flex justify-center items-center h-screen p-3'>
        <Card className='w-96 px-3 py-9'>
          <CardTitle>SIGN IN </CardTitle>
          <CardDescription>Welome Back To Amazona !!</CardDescription>
          <div className='mt-3'>
            <InputForm />
          </div>
          <Button onClick={createAccBtn} className='p-0' variant='link'>New Customer ? Create new Account</Button>
        </Card>
      </div>
    </HelmetProvider>
  )
}
