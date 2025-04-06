import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks, jskSidelinks, stateGroSidelinks, superAdminSidelinks, ulbAdminSidelinks, ulbGroSidelinks, stateAdminSidelinks, normalSidelinks, stateJskSidelinks, telecallerSidelinks, projectClientSideLinks } from '@/data/sidelinks'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context'
import { JSK_IVR_CALLING, NORMAL, STATE_ADMIN, STATE_GRO, STATE_JSK_IVR_CALLING, SUPER_ADMIN, ULB_ADMIN, ULB_GRO, TELE_CALLER, PROJECT_CLIENT } from '@/../config/roles.config'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)
  const [currentSideLinks, setcurrentSideLinks] = useState<any>(sidelinks)
  const navigate = useNavigate()
  const { user } = useAppContext()




  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    // 1 ULB ADMIN
    if (user?.roleId === ULB_ADMIN) {
      setcurrentSideLinks(ulbAdminSidelinks)
    }

    // 2 SUERPERADMIN
    if (user?.roleId === SUPER_ADMIN) {
      setcurrentSideLinks(superAdminSidelinks)
    }
    // 2 PROJECT CLIENT
    if (user?.roleId === PROJECT_CLIENT) {
      setcurrentSideLinks(projectClientSideLinks)
    }

    // 3 JSK/IVR/CALLING
    if (user?.roleId === JSK_IVR_CALLING) {
      setcurrentSideLinks(jskSidelinks)
    }

    // 4 NORMAL
    if (user?.roleId === NORMAL) {
      setcurrentSideLinks(normalSidelinks)
    }

    // 5 STATE GRO
    if (user?.roleId === STATE_GRO) {
      setcurrentSideLinks(stateGroSidelinks)
    }

    // 6 ULB GRO
    if (user?.roleId === ULB_GRO) {
      setcurrentSideLinks(ulbGroSidelinks)
    }

    // 7 STATEADMIN
    if (user?.roleId === STATE_ADMIN) {
      setcurrentSideLinks(stateAdminSidelinks)
    }

    //  STATEJSK
    if (user?.roleId === STATE_JSK_IVR_CALLING) {
      setcurrentSideLinks(stateJskSidelinks)
    }

    //telecallerSidelinks
    // if (user?.roleId === TELE_CALLER) {
    //   setcurrentSideLinks(ulbGroSidelinks)
    // }
    if (user?.roleId === TELE_CALLER) {
      setcurrentSideLinks(telecallerSidelinks)
    }

  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-b border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className='z-50 flex justify-between px-4 py-3 shadow-sm md:px-4'
        >
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`} >
            <div>
              <img src="https://img.freepik.com/premium-vector/computer-virus-detection-searching-bugs-data-protection-magnifier-glass_123447-5628.jpg?ga=GA1.1.871112965.1726233039&semt=ais_hybrid&w=740" alt="" className='w-11' />
            </div>
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className='font-medium cursor-pointer'>Bug-Tracking</span>
              <span className='text-xs'>Bug & Enhacement Logging</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 border-b py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          // links={sidelinks}
          links={currentSideLinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
