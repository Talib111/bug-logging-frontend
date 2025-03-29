import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks, jskSidelinks, stateGroSidelinks, superAdminSidelinks, ulbAdminSidelinks, ulbGroSidelinks, stateAdminSidelinks, normalSidelinks, stateJskSidelinks , telecallerSidelinks } from '@/data/sidelinks'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context'
import { JSK_IVR_CALLING, NORMAL, STATE_ADMIN, STATE_GRO, STATE_JSK_IVR_CALLING, SUPER_ADMIN, ULB_ADMIN, ULB_GRO ,TELE_CALLER } from '@/../config/roles.config'

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
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`} onClick={() => navigate('/bug-log/main')} >
            <div>
              <img src="https://i.ibb.co/vz5hT4c/jharkhand-Logo-uf1gjn.png" alt="" className='w-11' />
            </div>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 256'
              className={`transition-all ${isCollapsed ? 'h-6 w-6' : 'h-8 w-8'}`}
            >
              <rect width='256' height='256' fill='none'></rect>
              <line
                x1='208'
                y1='128'
                x2='128'
                y2='208'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
              <line
                x1='192'
                y1='40'
                x2='40'
                y2='192'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
              <span className='sr-only'>Website Name</span>
            </svg> */}
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className='font-medium cursor-pointer'>UD&HD</span>
              <span className='text-xs'>Grievance Management Module</span>
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
