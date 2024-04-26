import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { InputForm } from '@/components/ui/myComponents/InputForm'
import { RegisterForm } from '@/components/ui/myComponents/RegisterForm'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate();
  const goToLoginBtn = ()=>{
    navigate(`/signin`);
  }
  return (
    <div className='flex justify-center items-center h-screen p-3'>
      <Card className='w-96 px-3 py-9'>
        <CardTitle>REGISTER ACCOUNT </CardTitle>
        <CardDescription>Welome To Amazona !!</CardDescription>
        <div className='mt-3'>
          <RegisterForm />
        </div>
        <Button onClick={goToLoginBtn} className='p-0' variant='link'>Already have an account ?</Button>
      </Card>
    </div>
  )
}
