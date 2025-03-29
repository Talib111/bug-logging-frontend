import CitizenReviewForm from './CitizenReviewForm'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Image } from "@/components/image";
import { useState } from 'react';

export default function Home() {
  const [userImage,setUserImage] =useState<any>('')


  return (

      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-1 flex items-center flex-col md:px-10 mt-10 space-y-4">
          <CardTitle className='text-xl text-primary font-bold'>Give us your feedback</CardTitle>

          <Image src={userImage || "/images/complain_boy.png"} className="w-40" />
          <CardDescription className='text-center'>
           Fee free to give us your feedback
          </CardDescription>
          <CardDescription className='text-center'>
            Your feedback is very important for us to enhance our system, Please feel free to give us your valuable feedback.<Link target='_blank' className='underline hover:text-primary' to={'https://maps.app.goo.gl/ncVp959LoSja4uAh8'}>Jan Seva Kendra</Link> for further query. & Feel free to contact us on +918458697845
          </CardDescription>

        </div>
        <div className="col-span-4 md:col-span-3 p-10 bg-gray-50 h-screen">
        <CitizenReviewForm setUserImage={setUserImage} />
        </div>
      </div>
      
    
  )
}
