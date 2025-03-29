import { CardDescription, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Image } from "@/components/image";
import { useAppContext } from '@/context';
import Tools from './Tools';

export default function Home() {
  const {currentLanguage}:any = useAppContext()
  return (
   
      <div className="grid sm:grid-cols-4 grid-cols-1">
        <div className="col-span-4 md:col-span-1 flex items-center flex-col md:px-10 mt-10 space-y-4 hidden sm:block">
          <CardTitle className='text-xl text-primary font-bold'>{currentLanguage?.TRACK_GR}</CardTitle>

          <Image src="/images/complain_boy.png" className="w-40" />
          <CardDescription className='text-center'>
          {currentLanguage?.FF_FB}
          </CardDescription>
          <CardDescription className='text-center'>
          {currentLanguage?.YF_FB}</CardDescription>

        </div>
        <div className="col-span-4 md:col-span-3 p-2 sm:p-10 bg-gray-50 h-screen">
        <Tools/>
        </div>
      </div>
    
    
  )
}
