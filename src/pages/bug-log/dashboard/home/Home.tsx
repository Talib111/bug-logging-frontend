''
import { useState } from 'react'
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
import { I_ROLE_TYPE_LIST } from './type'

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')

  const projectData = useApi<I_ROLE_TYPE_LIST>({
    api: `${grievanceAPI.getAllProject}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllProjects',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  return (
    <main className='grid items-start'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div className='font-bold text-2xl'>Projects({projectData?.data?.data?.totalDocs})</div>
        </div>
        <Card className='bg-transparent shadow-none border-none'>
          <CardHeader className="px-7">
          </CardHeader>
          <CardContent>
            {projectData?.isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {projectData?.data?.data?.docs?.map((item, index) => (
                  <Card key={item?._id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <CardTitle className="text-lg">{item?.projectName}</CardTitle>
                        </div>
                        <div>
                          <Badge className='w-full' variant={item?.status == 1 ? "success" : "secondary"}>
                            {item?.status == 1 ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-center bg-gray-100 rounded-md  mb-2 overflow-hidden">
                        {/* Template preview thumbnail or placeholder */}
                        <Image src={item?.imageUrl || "/images/mailT.webp"} alt={item?.projectName || ""} className="w-auto h-32" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Bugs : <span className='text-black font-semibold'>{item?.activeBugs || 0}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Enhancements :  <span className='text-black font-semibold'>{item?.activeEnhancement || 0}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex flex-col gap-2">
                      <Link className='w-full' to={`/bug-log/dashboard/complaint-workflow?projectId=${item?._id}&projectName=${item?.projectName}`}>
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
                      <Link className='w-full' to={`/bug-log/dashboard/enhancement-list?projectId=${item?._id}&projectName=${item?.projectName}`}>
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
