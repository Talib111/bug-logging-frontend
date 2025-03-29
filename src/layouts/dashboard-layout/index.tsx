import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { useAppContext } from '@/context'


export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const {user} = useAppContext();

  if(user?.role == 'Citizen user'){
    return(
      <div className="flex justify-center items-center h-screen">
        <h1>Unauthorized Access</h1>
        <p>You are not authorized to access this page.</p>
        <a href="/">Go to Homepage</a>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>Toggle Sidebar</button>
      </div>
    )
  }

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-scroll md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full bg-secondary`}
      >
        <Outlet />
      </main>

     
    </div>
  )
}
