import React, { forwardRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import UseTitle from '@/hooks/useTitle'
import { Layout } from '@/components/custom/layout'
import Notification from '@/components/notification'
import Recentpdates from '@/components/recent-updates'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import SidePanel from '../side-panel/SidePanel'
import { Bell, Clock4 } from 'lucide-react'
import { CardTitle } from '../ui/card'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppContext } from '@/context'
import MyLanguage from "@/pages/grievance/citizen/citizen-complaint-form/user-inputs/language"

type PageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: React.ReactNode
  title?: string
  subTitle?: string
  searchLink?: string
  searchLabel?: string
  meta?: any
}
 
const Page = forwardRef(
  (
    { children, title = '', subTitle = '', searchLink = '', searchLabel = '', meta, ...other }: PageProps,
    ref?: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    UseTitle(title)

    const { user } = useAppContext()
    const {  currentLanguage, setcurrentLanguage, languageKey, setlanguageKey }:any = useAppContext()
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }, [title])
    const handleChange = (event: { target: { value: any } }) => {
      const selectedLanguage = event.target.value;
      setcurrentLanguage(MyLanguage(selectedLanguage));
      setlanguageKey(selectedLanguage);
    };

    return (
      <>
        <Helmet>
          <title>{`${title} | Grievance`}</title>
          {meta}
        </Helmet>
        <div ref={ref} {...other}>

          <Dialog>
            <DialogHeader>
            </DialogHeader>
            <DialogContent className="sm:max-w-[600px]">
              <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>This is your process<Link to={`/grievance/citizen/complaint-registration-info`} target='_blank'></Link> </CardTitle>

              <div className="py-4">
                <video controls autoPlay width={'fill'} >
                  <source src="/images/info1.mp4" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </div>
            </DialogContent>





            <Layout fixed>
              {/* ===== Top Heading ===== */}
              <Layout.Header
                sticky
                className='border-b border-r-2 border-r-muted'
              >
                {/* <Search /> */}
                <div className='flex gap-3'>
                {user?.ulbName && 
                <h1
                className='text-gray-700 font-bold text-lg  hidden sm:block'
              >
                 ULB :- {user?.ulbName}</h1>}  
                  <h1
                    className='text-gray-700 font-bold text-lg  hidden sm:block'
                  >ROLE :- {user?.role == "Normal" ? "Workflow Member" : user?.role  }</h1>
                </div>
                <div className='ml-auto flex items-center space-x-4 '>

                  {/* <DialogTrigger asChild>
                    <div className="w-6 h-6 bg-background border border-black cursor-pointer rounded-full flex justify-center items-center shadow-xl">
                      <span className='font-bold text-xl'>?</span>
                    </div>
                  </DialogTrigger> */}

                  {/* RECENT UPDATES */}
                  <SidePanel trigger={<Clock4 size={25} className="text-black cursor-pointer hover:scale-110" />}>
                    <CardTitle className='mb-4 text-[#0D7538] text-lg'>Recent Updates</CardTitle>
                    <Recentpdates notificationSide={0} notificationType={1} />
                  </SidePanel>
                  {/* NOTIFICATIONS */}
                  <SidePanel trigger={<Bell size={25} className="text-black cursor-pointer hover:scale-110" />}>
                    <CardTitle className='mb-4 text-[#0D7538] text-lg '>My Notifications </CardTitle>
                    <Notification notificationSide={0} notificationType={0} />
                  </SidePanel>
                  {/* LANGUAGE */}
                  {/* <ThemeSwitch />   */}


                   <div>
      {/* Only show the select button if the user's role is "Citizen" */}
      {user?.role === 'Citizen user' ? (
  <div className="relative">
    <select
      value={languageKey}
      onChange={handleChange}
      className="h-10 bg-transparent outline-none cursor-pointer"
    >
      <option value="english">English</option>
      <option value="hindi">हिन्दी</option>
    </select>
  </div>
) : (
  <div style={{ display:'none'}}></div>
)}


    </div>
                 
                  
                  <UserNav />
                </div>
              </Layout.Header>

              <Layout.Body>
                <div className='mb-2 flex items-center justify-between space-y-2'>
                  <div>
                    <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
                    <p className='text-muted-foreground'>{subTitle}</p>
                  </div>

                  {searchLabel && <Link className='text-blue-800 font-semibold hover:underline' to={searchLink} target='_blank'><div>{searchLabel}</div></Link>}
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                  {children}
                </div>
              </Layout.Body>
            </Layout>
          </Dialog>
        </div>
      </>
    )
  }
)

export default Page
