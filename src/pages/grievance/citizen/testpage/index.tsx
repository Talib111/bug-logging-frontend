// import CitizenTrackComplaint from './CitizenTrackComplaint'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Image } from "@/components/image";
import { useAppContext } from '@/context';
import Tools from './Tools';

export default function Home() {
  const {currentLanguage}:any = useAppContext()
  return (
   
    <div className="grid sm:grid-cols-4 grid-cols-1 gap-6">
    {/* Sidebar Section */}
    <div className="col-span-4 md:col-span-1 flex flex-col items-center px-4 md:px-6 py-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-primary mb-4">{currentLanguage?.TRACK_GR}</h2>
      <div className="w-32 h-32 mb-4">
        <img src="/images/complain_boy.png" alt="Complaint Boy" className="w-full h-full object-cover" />
      </div>
      <p className="text-sm text-gray-600 text-center leading-relaxed">
        {currentLanguage?.FF_FB}
      </p>
      <p className="text-sm text-gray-600 text-center leading-relaxed mt-2">
        {currentLanguage?.YF_FB}
      </p>
    </div>
  
    {/* Tools Section */}
    <div className="col-span-4 md:col-span-3 p-4 md:p-6 bg-gray-100 rounded-2xl shadow-lg">
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <Tools/>
      </div>
    </div>
  </div>
  
    
    
  )
}
