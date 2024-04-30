import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { ProductCreateForm } from '@/components/ui/myComponents/ProductCreateForm'
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import React from 'react'

export default function ProductCreatePage() {
  return (
    <div>
    <UserNavbar />
    <div className='flex justify-center items-center  p-3'>
        <Card className='w-full sm:w-96 lg:w-6/12 px-3 py-9'>
            <CardTitle>CREATE PRODUCT </CardTitle>
            <CardDescription>Please Input The Correct Information</CardDescription>
            <div>
                <ProductCreateForm />
            </div>
        </Card>
    </div>
</div>
  )
}
