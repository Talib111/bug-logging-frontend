import TopBar from '@/components/top-bar'
import { Outlet } from 'react-router-dom'
import Footer from "@/components/footer";

export default function () {
  return (
    <div>
      <TopBar />

      {/* <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-1 flex items-center flex-col md:px-10 mt-10 space-y-4">
          <CardTitle className='text-xl text-primary font-bold'>Register Your grievance Here</CardTitle>

          <Image src="/images/complain_boy.png" className="w-40" />
          <CardDescription className='text-center'>
            Fill the form to process your complaint.
          </CardDescription>
          <CardDescription className='text-center'>
            You can register your grievance here or you can visit our nearest <Link target='_blank' className='underline hover:text-primary' to={'https://maps.app.goo.gl/ncVp959LoSja4uAh8'}>Jan Seva Kendra</Link> for further query. & Feel free to contact us on +918458697845
          </CardDescription>

        </div> */}
        {/* <div className="col-span-4 md:col-span-3 p-10 bg-gray-50 h-screen"> */}
          <Outlet />
        {/* </div> */}
      {/* </div> */}
      {/* <h1>Footer</h1>{' '} */}
      {/* ════════════ FOOTER CONTAINER   ═════════════════ */}
      <Footer />
    </div>
  )
}
