import { Outlet } from 'react-router-dom'
import CitizenSidebar from '@/components/citizenSidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className='relative h-full overflow-hidden bg-primary'>
      <CitizenSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-scroll md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full bg-secondary`}
      >
        <Outlet />
      </main>
    </div>
  )
}
