''
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card'

import { useApi, usePostMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Image } from '@/components/image'
import { ChevronRight, ChevronsLeft } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import UlbForm from '../user-inputs/UlbForm'
import FormStepper from '@/components/form-stepper'
import ModuleForm from '../user-inputs/ModuleForm'
import BasicInfo from '../user-inputs/BasicInfo'
import ComplaintInfo from '../user-inputs/ComplaintInfo'
import toast from 'react-hot-toast'
import FormReview from '../user-inputs/FormReview'
import FormSubmitSuccess from '../user-inputs/FormSubmitSuccess'
import { ButtonLoading } from '@/components/forms'
import { Link } from 'react-router-dom'

export default function ComplaintList() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [formStep, setformStep] = useState<number>(0)
  const [complaintData, setcomplaintData] = useState<any>({})
  const [formResponse, setformResponse] = useState<any>({})
  const postMutation = usePostMutation({})

  const inboxListData = useApi<any>({
    api: `${grievanceAPI.getAllComplaintDirect}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'SeachCitizenComplaints',
    value: [page, perPage],
    options: {
      enabled: true,
    },  
  })


  const submitComplaint = async () => {
    try {

      const formData = new FormData()
      formData.append('citizenName', complaintData?.name)
      formData.append('email', complaintData?.email)
      formData.append('mobileNo', complaintData?.mobileNo)
      formData.append('complaintTitle', complaintData?.complaintTitle)
      formData.append('complaintDescription', complaintData?.complaintDescription)
      formData.append('moduleId', complaintData?.module)
      formData.append('ulbId', complaintData?.ulb)
      formData.append('imageUrl', complaintData?.complaintDocument as any)
      const res = await postMutation.mutateAsync({
        api: grievanceAPI.createComplaintApplication,
        data: formData,
      })
      if (res.data?.success) {
        setformResponse(res?.data?.data)
        setcomplaintData({})
        toast.success(res?.data?.message)
        setformStep(6)
      } else {
        toast.error('Grievance not created successfully')
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
      <Dialog>
        <DialogHeader>
        </DialogHeader>
        <DialogContent className="sm:max-w-[500px] z-50">
          <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>Complaint Registration <Link to={`/bug-log/citizen/complaint-registration-info`} target='_blank'><span className='text-amber-600 underline cursor-pointer'>Know How it works?</span></Link> </CardTitle>

          <div className="py-4">


            {formStep < 5 && <FormStepper status={formStep - 1} />}

            {formStep === 1 && <UlbForm setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
            {formStep === 2 && <ModuleForm setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
            {formStep === 3 && <BasicInfo setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
            {formStep === 4 && <ComplaintInfo setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
            {formStep === 5 && <FormReview complaintData={complaintData} />}
            {formStep === 6 && <FormSubmitSuccess formResponse={formResponse} />}

            {formStep === 5 && <div className='px-10 mb-5'>
              <ButtonLoading isLoading={postMutation.isPending} onClick={submitComplaint} className='w-full flex justify-center items-center'>
                <span className='text-xs'>Submit</span>
              </ButtonLoading>
            </div>}
            {(formStep < 6  && formStep > 1 ) && <div className='px-10'>
              <Button onClick={() => setformStep(formStep - 1)} variant={'outline'} className='w-full flex justify-center items-center'>
                <ChevronsLeft size={20} className='inline mr-2' /> <span className='text-xs'>Go Back</span>
              </Button>
            </div>}
          </div>
        </DialogContent>


        <main className='grid items-start'>



          <div className='grid auto-rows-max items-start gap-4'>
            <div className='flex w-full justify-between gap-2'>
              <div>
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  refetch={inboxListData.refetch}
                  isFetching={inboxListData.isLoading}
                />
              </div>
              <div>
                <DialogTrigger onClick={() => setformStep(1)} asChild>
                  <Button className='flex justify-center items-center'>
                    <span className='text-xs'>Register Custom Complaint</span>
                    <ChevronRight size={15} className='inline' />
                  </Button>
                </DialogTrigger>

              </div>
            </div>
            <Card className='shadow-none border-none rounded-none'>

              <CardContent>
                {inboxListData.isLoading ? (
                  <div className='flex h-32 items-center justify-center'>
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col justify-center w-full px-4">
                      {inboxListData?.data?.data?.docs?.map((item: any) => (
                        <div key={`complaint${item?._id}`} className="w-full px-8 py-2 bg-white rounded-md shadow-lg mb-2 relative">
                          <div className="flex mt-6  pr-10">
                            <Image className="flex-initial object-cover mx-2 rounded-full w-14 h-14" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
                            <div className="mx-2 flex-1">
                              <h1 className="font-semibold text-gray-800 dark:text-white">{item?.titleName}</h1>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{item?.description}</span>
                            </div>
                          </div>

                          <DialogTrigger onClick={() => setformStep(1)} asChild>
                            <Button className='absolute right-0 bottom-0 flex justify-center items-center' variant={'secondary'}>
                              <span className='text-xs'>Register</span>
                              <ChevronRight size={15} className='inline' />
                            </Button>
                          </DialogTrigger>

                        </div>
                      ))}
                    </div>

                    <Separator className='mb-2 mt-4' />
                    <div className='flex w-full justify-end'>
                      <PaginationComponent
                        page={page}
                        perPage={perPage}
                        totalPage={inboxListData?.data?.data?.totalDocs}
                        hasNextPage={inboxListData?.data?.data?.hasNextPage}
                        hasPrevPage={inboxListData?.data?.data?.hasPrevPage}
                        setPage={setPage}
                        setPerPage={setPerPage}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </Dialog>
  )
}
