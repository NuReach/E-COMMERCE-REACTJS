import LineChart from '@/components/ui/myComponents/LineChart'
import MyCard from '@/components/ui/myComponents/MyCard'
import MyPageTitle from '@/components/ui/myComponents/MyPageTitle'
import MyPieChart from '@/components/ui/myComponents/MyPieChart'
import PieChart from '@/components/ui/myComponents/MyPieChart'
import UserNavbar from '@/components/ui/myComponents/UserNavbar'
import { Store } from '@/utils/Store'
import { proxy } from '@/utils/Utils'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DollarSign, LucideListOrdered, UserRound } from 'lucide-react'
import React, { useContext } from 'react'

export default function Dashboard() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const {isLoading , isError , data:summary} = useQuery({ 
    queryKey: ['summary'], 
    queryFn: async ()=>{
      try {
        const response = await axios.get(`${proxy}/api/orders/summary/detail`,
          {
            headers : {
              Authorization : `Bearer ${userInfo.token}`
          }
          }
        )  ; 
        return response.data;

      } catch (error) {
        throw error;
      }
    } 
  });
  console.log(summary);
  return (
    <div>
        <UserNavbar />
        <div className='py-6 px-6 sm:px-12 lg:px-24 flex flex-col gap-9'>
          <div>
            <MyPageTitle title={"Dashboard"} />
          </div>
          <div className=' flex flex-wrap justify-between gap-9'>
            <MyCard title={"User"} icon={<UserRound />} value={`+${summary?.users[0].numUsers}`} />
            <MyCard title={"Order"} icon={<LucideListOrdered />} value={`+${summary?.orders[0].numOrders}`} />
            <MyCard title={"Total Order"} icon={<DollarSign />} value={`+${summary?.orders[0].totalSales}`} />
          </div>
          <div className=''>
            <MyPageTitle title={"Sale"} />
          </div>
          <div className='w-full h-96'>
            <LineChart data = {summary?.dailyOrders} />
          </div>
          <div className=''>
            <MyPageTitle title={"Category"} />
          </div>
          <div className='w-full h-[600px] flex justify-center items-center'>
            <MyPieChart data = {summary?.productCategories} />
          </div>
        </div>
    </div>
  )
}
