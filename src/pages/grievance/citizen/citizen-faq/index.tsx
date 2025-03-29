import FaqList from './FaqList'
import { CardTitle } from '@/components/ui/card'
import FaqForm from './FaqForm';

export default function Home() {

  return (
    <>
      <FaqList />
    </>
  )
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-1 flex items-center flex-col md:px-10 mt-10 space-y-4">
          <CardTitle className='text-xl text-primary font-bold'>Search For FAQ</CardTitle>
          <FaqForm />

        </div>
        <div className="col-span-4 md:col-span-3 p-10 bg-gray-50 h-screen">
          <FaqList />
        </div>
      </div>
    </>

  )
}
