import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { InputForm } from '@/components/ui/myComponents/InputForm'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

export default function SigninPage() {
  const navigate = useNavigate();
  const createAccBtn = ()=>{
    navigate(`/register`);
  }
  return (
    <div className='flex justify-center items-center h-screen p-3'>
      <Helmet>
          <title>Signin Page</title>  
      </Helmet>
      <Card className='w-96 px-3 py-9'>
        <CardTitle>SIGN IN </CardTitle>
        <CardDescription>Welome Back To Amazona !!</CardDescription>
        <div className='mt-3'>
          <InputForm />
        </div>
        <Button onClick={createAccBtn} className='p-0' variant='link'>New Customer ? Create new Account</Button>
      </Card>
    </div>
  )
}
