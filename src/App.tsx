import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from 'react-hot-toast'
import AllRoutes from './routes'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useLocation, useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log('the location is.', location)

  return (
    <TooltipProvider>
      <Toaster position='top-center' reverseOrder={false} toastOptions={{}} />
      <AllRoutes />

      {/* _____________ FLOATING BUG ENTRY ICON ________ */}
      {location.pathname !== '/bug-log/dashboard/management-complaint-form' && <Avatar onClick={() => navigate('/bug-log/dashboard/management-complaint-form')} className='h-16 w-16 border-2 p-2 absolute bottom-10 right-10 bg-amber-400 shadow-lg border-white cursor-pointer flex flex-col hover:border-primary'>
        <AvatarImage className='rounded-full' src={'/images/bug.png'} alt='profile' />
      </Avatar>}
    </TooltipProvider>
  )
}
