import CitizenReviewForm from './CitizenReviewForm'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Image } from "@/components/image";
import { useState } from 'react';
import { useAppContext } from '@/context';

export default function Home() {
    const { currentLanguage } :any= useAppContext();
  
  const [userImage,setUserImage] =useState<any>('')
  
  return (

      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-1 flex items-center flex-col md:px-10 mt-10 space-y-4">
          <CardTitle className='text-xl text-primary font-bold'>{}</CardTitle>

          <Image src={userImage || "/images/complain_boy.png"} className="w-40" />
          <CardDescription className='text-center'>
           {currentLanguage?.FFTGUYF}
          </CardDescription>
          <CardDescription className='text-center'>
            {currentLanguage?.YFIVIFU}<Link target='_blank' className='underline hover:text-primary' to={'https://maps.app.goo.gl/ncVp959LoSja4uAh8'}>{currentLanguage?.JSK2}</Link> {currentLanguage?.JSK2}
          </CardDescription>

        </div>
        <div className="col-span-4 md:col-span-3 p-10 bg-gray-50 h-screen">
        <CitizenReviewForm setUserImage={setUserImage} />
        </div>
      </div>
    
    
  )
}
