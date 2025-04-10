import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import Spinner from '@/components/loaders/Spinner'
import { Eye } from "lucide-react"
import { Image } from '@/components/image'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


export default function Home() {

  const myProjectData = useApi<any>({
    api: `${grievanceAPI.getMyProjectDetails}`,
    key: 'getMyProjects',
    value: [],
    options: {
      enabled: true,
    },
  })

  return (
    <main className='grid items-start'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full gap-2 items-center'>
          <Avatar className='h-12 w-12 border p-2'>
            <AvatarImage className='rounded-full' src={myProjectData?.data?.data?.imageUrl || '/images/dummy-user.png'} alt='profile' />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <div>
            <div className='font-bold text-2xl'>{myProjectData?.data?.data?.projectName}</div>
          </div>
        </div>
        <Card className='bg-transparent shadow-none border-none'>
          <CardHeader className="px-7">
          </CardHeader>
          <CardContent>
            {myProjectData.isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Bug Record</CardTitle>
                      </div>
                      <div className="flex items-center">
                        <Badge className='text-xs' variant={1 == 1 ? "success" : "secondary"}>
                          {1 == 1 ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center bg-gray-100 rounded-md  mb-2 overflow-hidden">
                      <Image src={"https://img.freepik.com/premium-vector/person-stands-laptop-showing-error-sign-surrounded-by-notifications-gears-man-standing-laptop-with-error-sign-flat-illustration_585735-40821.jpg?ga=GA1.1.871112965.1726233039&semt=ais_hybrid&w=740"} alt={""} className="w-auto h-32" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Bugs : <span className='text-black font-semibold'>{myProjectData?.data?.data?.activeBugs || 0}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link className='w-full' to={`/bug-log/dashboard/complaint-workflow`}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { }}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Active Bugs
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Enhancement Record</CardTitle>
                      </div>
                      <div className="flex items-center">
                        <Badge className='text-xs' variant={1 == 1 ? "success" : "secondary"}>
                          {1 == 1 ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center bg-gray-100 rounded-md  mb-2 overflow-hidden">
                      {/* Template preview thumbnail or placeholder */}
                      <Image src={"https://img.freepik.com/free-photo/top-view-list-written-yellow-sticky-note-colorful-sticky-notes-lupa-pen-cinnamon-sticks-ruler-cup-tea_140725-145693.jpg?ga=GA1.1.871112965.1726233039&semt=ais_hybrid&w=740"} alt={""} className="w-auto h-32" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Enhancement : <span className='text-black font-semibold'>{myProjectData?.data?.data?.activeEnhancement || 0}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link className='w-full' to={`/bug-log/dashboard/enhancement-list`}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { }}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Active Enhancements
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
