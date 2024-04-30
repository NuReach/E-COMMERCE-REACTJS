import LineChart from '@/components/ui/myComponents/LineChart'
import MyCard from '@/components/ui/myComponents/MyCard'
import MyPageTitle from '@/components/ui/myComponents/MyPageTitle'
import MyPieChart from '@/components/ui/myComponents/MyPieChart'
import PieChart from '@/components/ui/myComponents/MyPieChart'
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { DollarSign, LucideListOrdered, UserRound } from 'lucide-react'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
        <UserNavbar />
        <div className='py-6 px-6 sm:px-12 lg:px-24 flex flex-col gap-9'>
          <div>
            <MyPageTitle title={"Dashboard"} />
          </div>
          <div className=' flex flex-wrap justify-between gap-9'>
            <MyCard title={"User"} icon={<UserRound />} value={`+${123}`} />
            <MyCard title={"Order"} icon={<LucideListOrdered />} value={`+${123}`} />
            <MyCard title={"Total Order"} icon={<DollarSign />} value={`+${123}`} />
          </div>
          <div className=''>
            <MyPageTitle title={"Sale"} />
          </div>
          <div className='w-full h-96'>
            <LineChart />
          </div>
          <div className=''>
            <MyPageTitle title={"Category"} />
          </div>
          <div className='w-full h-[600px] flex justify-center items-center'>
            <MyPieChart />
          </div>
        </div>
    </div>
  )
}
