import { User } from 'lucide-react'
import React from 'react'

export default function MyCard({title,icon,value}) {
  return (
    <div className=' w-full md:w-72 border-2 rounded-lg p-6'>
        <div className='flex justify-between'>
            <p className='font-bold'>{title}</p>
            {icon}
        </div>
        <div>
            <h1>{value}</h1>
        </div>
    </div>
  )
}
