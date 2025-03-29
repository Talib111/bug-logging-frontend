import ComplaintList from './ComplaintList'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Image } from '@/components/image'
import { Link } from 'react-router-dom'
export default function page() {
  return (
    <div className="grid grid-cols-4 h-screen">
      <div className="col-span-4 md:col-span-1 flex items-center flex-col md:px-10 mt-10 space-y-4 h-screen overflow-hidden">
        <CardTitle className='text-xl text-primary font-bold'>Search existing Grievance or Register custom grievance</CardTitle>

        <Image src="/images/complain_boy.png" className="w-40" />
        <CardDescription className='text-center'>
          Fill the form to process your complaint.
        </CardDescription>
        <CardDescription className='text-center'>
          You can register your grievance here or you can visit our nearest <Link target='_blank' className='underline hover:text-primary' to={'https://maps.app.goo.gl/ncVp959LoSja4uAh8'}>Jan Seva Kendra</Link> for further query. & Feel free to contact us on +918458697845
        </CardDescription>

      </div>
      <div className="col-span-4 md:col-span-3 p-10 bg-gray-50 h-screen">
        <ComplaintList />
      </div>
    </div>

  )
}
