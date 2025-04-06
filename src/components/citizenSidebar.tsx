import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import {citizenLinks } from '@/data/sidelinks'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function citizenSidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const { currentLanguage } :any= useAppContext();

    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [navOpened, setNavOpened] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentSideLinks,setCurrentSideLinks] = useState<any>()
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const isNativeColor = ()=>{
    // @ts-ignore
    if(window.ReactNativeWebView){
      return 'bg-[#12743B]'
    }else{
      return 'bg-primary'
    }
  }

  /* Make body not scrollable when navBar is opened */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  


  return (
    <aside
      className={cn(
        `${isNativeColor()} fixed left-0 right-0 top-0 z-50 w-full border-b border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden `}
      />

      <Layout fixed className={navOpened ? 'h-svh ' : ''}>
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
              <span className='text-xs'>{currentLanguage?.GM}</span>
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
          className={`z-40 ${isNativeColor()} dark:bg-black text-white h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 border-b py-0 md:max-h-screen md:py-2'}`}
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
