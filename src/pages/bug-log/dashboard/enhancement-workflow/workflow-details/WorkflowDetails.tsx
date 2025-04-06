'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import CommentCard from './CommentCard'
import { FormProviders, RHFTextArea, ButtonLoading } from '@/components/forms'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  CircleX,
  MoveRight,
  FileText,
} from 'lucide-react'

import { getErrorMessage, grievanceAPI } from '@/lib'
import { Link, useLocation } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import ResolveComponent from './ResolveComponent'
import RejectComponent from './RejectComponent'
import WorkflowMemberComponent from './WorkflowMemberComponent'
import { Badge } from '@/components/ui/badge'
import moment from 'moment'
import { Image } from '@/components/image'
import RHFTextField from '@/components/forms/RHFUploadFiled'
import { Label } from '@/components/ui/label'
import checkJson from '@/components/animation-files/check.json'
import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'
import TransferToUlb from './TransferToUlb'
import { Confirm } from '@/components/confirm-box'
import profile from '/images/profile.png'
const schema = yup.object().shape({
  comment: yup.string().required('Comment is required'),
})

type FormType = yup.InferType<typeof schema>

export default function EnteranceWorkflowDetails({
  setsearchLink,
  setsearchLabel,
}: any) {
  const [loggedOutAnimation, setloggedOutAnimation] = useState<boolean>(false)
  const [actionComponentStatus, setActionComponentStatus] = useState(0)
  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false)
  const mutate = usePutMutation({})

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const complaintId = query.get('complaintId')

  const complaintData = useApi<any>({
    api: `${grievanceAPI.getComplaintDetailsById}/${complaintId}`,
    key: 'ComplaintDetails',
    options: {
      enabled: true,
    },
  })

  // console.log("data api =============> ",complaintData)
  // console.log(complaintData?.data?.data?.reminder)

  const actionPermissions = useApi<any>({
    api: `${grievanceAPI.checkWfActions}/${complaintId}`,
    key: 'actionPermission',
    options: {
      enabled: true,
    },
  })

  const complaintLogData = useApi<any>({
    api: `${grievanceAPI.complaintApplicationLog}/${complaintId}`,
    key: 'complaintApplicationLog',
    options: {
      enabled: true,
    },
  })

  const complaintAllComments = useApi<any>({
    api: `${grievanceAPI.getAllCommentsByComplaintId}/${complaintId}`,
    key: 'getAllComments',
    options: {
      enabled: true,
    },
  })

  const methods = useForm<FormType>({
    defaultValues: {
      comment: '',
    },
    resolver: yupResolver(schema),
  })
  const { handleSubmit } = methods

  const onSubmit = async (data: FormType, event: any) => {
    const buttonName = event.nativeEvent.submitter.name
    let url = ''

    // FOR ENTERANCE WORKFLOW PROCESS
    if (buttonName === 'comment') {
      url = grievanceAPI.openComment
    }

    let requestBody = {
      comment: data.comment,
      complaintId: complaintData?.data?.data?._id,
    }

    try {
      const result = await mutate.mutateAsync({
        api: url,
        data: requestBody,
      })
      if (result.data.success) {
        // setloggedOutAnimation(true)
        toast.success(result.data.message)
        complaintData?.refetch()
        complaintAllComments?.refetch()
        actionPermissions.refetch(), methods.reset()
      } else {
        toast.error(result.data.message)
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const moveComplaintToMe = async () => {
    Confirm(
      'Are you sure?',
      'Do you want to move this Grievance to your panel',
      async () => {
        let requestBody = {
          complaintId: complaintData?.data?.data?._id,
          comment: '',
        }

        try {
          const result = await mutate.mutateAsync({
            api: grievanceAPI.moveComplaintToMe,
            data: requestBody,
          })
          if (result.data.success) {
            setloggedOutAnimation(true)
            complaintData?.refetch()
            complaintAllComments?.refetch()
            actionPermissions.refetch()
          } else {
            toast.error(result.data.message)
          }
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }
    )
  }

  const escalateAction = async (e: any) => {
    Confirm(
      'Are you sure?',
      `Do you want to ${e.target.checked ? 'Escalate' : 'De-Escalate'} this complaint`,
      async () => {
        let requestBody = {
          complaintId: complaintData?.data?.data?._id,
        }

        try {
          const result = await mutate.mutateAsync({
            api: grievanceAPI.escalateAction,
            data: requestBody,
          })
          if (result.data.success) {
            setloggedOutAnimation(true)
            complaintData.refetch()
          } else {
            toast.error(result.data.message)
          }
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }
    )
  }




  useEffect(() => {
    setTimeout(() => {
      setloggedOutAnimation(false)
    }, 1600)
  }, [loggedOutAnimation])

  return (
    <main className='grid flex-1 items-start'>
      {/* ═══════════════════════║LOGGED OUT ANIMATION ║══════════════════════════ */}
      {loggedOutAnimation && (
        <div
          style={{ zIndex: 1001 }}
          className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white'
        >
          <div className='flex flex-col items-center justify-center'>
            <Lottie className='w-24' animationData={checkJson} loop={true} />
            <div className='font-semibold'>Grievance Moved successfully.</div>
          </div>
        </div>
      )}

      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className=''>
          <div className=' bg-background'>
            <div className='mx-auto max-w-7xl  rounded-lg p-8 shadow-lg'>
              <div className='flex justify-between'>
                <h1 className='mb-6 text-xl font-bold uppercase text-blue-800'>
                  Tracking No : {complaintData?.data?.data?.complaintRefNo}
                </h1>
                <h1 className='text- Capitalize  mb-6 font-bold'>
                  <span className='opacity-60'>Project : </span>
                  {complaintData?.data?.data?.workflow?.workFlowName}
                </h1>

                <h1 className='text-md mb-6  flex items-center font-bold'>
                  <span>
                    Status -
                    {complaintData?.data?.data?.wf_status === 0 && (
                      <Badge className='ml-2 bg-yellow-500'>Pending</Badge>
                    )}
                    {complaintData?.data?.data?.wf_status === 1 && (
                      <Badge className='ml-2 bg-green-500'>Resolved</Badge>
                    )}
                    {complaintData?.data?.data?.wf_status === 2 && (
                      <Badge className='ml-2 bg-red-500'>Rejected</Badge>
                    )}
                    {complaintData?.data?.data?.wf_status === 3 && (
                      <Badge className='ml-2 bg-yellow-500'>
                        Pending(re-opened)
                      </Badge>
                    )}
                    {complaintData?.data?.data?.wf_status === 4 && (
                      <Badge variant={'destructive'}>Closed</Badge>
                    )}
                  </span>
                </h1>
              </div>
              <p className='mb-2 text-gray-600'>
                Registered on{' '}
                {moment(complaintData?.data?.data?.createdAt).format(
                  'DD-MM-YYYY'
                )}
              </p>

              <div className='mt-1 border-b border-[#99B37C]'></div>

              <div className='mt-4  grid grid-cols-1 space-y-4   md:grid-cols-3'>
                <div className='flex items-center  space-x-4'>
                  <div className='font-semibold'>Platform : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.citizenName || 'N/A'}
                    </p>{' '}
                  </div>
                </div>

                <div className='flex items-center  space-x-4'>
                </div>
                <div className='flex items-center  space-x-4'>
                </div>

                <div className='flex items-center  space-x-4'>
                  <div className='font-semibold'>Priority Type : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.priorityType?.priorityName}
                    </p>{' '}
                  </div>
                </div>

                <div className='flex items-center  space-x-4'>
                </div>
                <div className='flex items-center  space-x-4'>
                </div>

                <div className='flex items-center  space-x-4'>
                  <div className='font-semibold'>Title : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.bugTitle}
                    </p>{' '}
                  </div>
                </div>


                <div className='col-span-3 my-20 border-b border-[#99B37C]'></div>
                <div className='col-span-2 flex flex-col'>
                  <div className='font-semibold'>Description : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.bugDescription}
                    </p>{' '}
                  </div>
                </div>

                {complaintData?.data?.data?.wf_currentReopenComment && (
                  <div className="col-span-2 flex flex-col">
                    <div className="font-semibold">Remark :</div>
                    <div>
                      <p className="opacity-90">
                        {complaintData.data.data.wf_currentReopenComment}
                      </p>
                    </div>
                  </div>
                )}

                {complaintData?.data?.data?.customAddress && (
                  <div className='col-span-2 flex flex-col'>
                    <div className='font-semibold'>Address : </div>
                    <div>
                      <p className='opacity-90'>
                        {complaintData?.data?.data?.customAddress}
                      </p>{' '}
                    </div>
                  </div>
                )}

                {/* COMPLAINT DOCUMENT SECTION */}
                <div className='col-span-3 flex flex-col'>
                  <div className='font-semibold'>Bug Document :</div>
                  <div className='cursor-pointer'>
                    {!complaintData?.data?.data?.imgUrl && <span className='font-semibold text-gray-700'>No Document Found !</span>}

                    {complaintData?.data?.data?.imgUrl &&
                      complaintData?.data?.data?.imgUrl.includes('.pdf') ? (
                      <div onClick={() => window.open(complaintData?.data?.data?.imgUrl, '_blank')} className='flex h-20  w-20 items-center justify-center'>
                        {' '}
                        <FileText className='h-20 w-20 text-red-500 mt-2' />
                      </div>
                    ) : (
                      <Image onClick={() => window.open(complaintData?.data?.data?.imgUrl, '_blank')}
                        src={complaintData?.data?.data?.imgUrl}
                        className='w-40 mt-2'
                      />
                    )}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Card x-chunk='dashboard-05-chunk-3'>
          <CardContent className='grid grid-cols-3 py-10'>
            <div className='col-span-2 pr-10'>
              <FormProviders
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
                  <div className='col-span-4'>
                    <RHFTextArea
                      className='w-full rounded-lg border bg-background p-4'
                      label='Comment'
                      name='comment'
                      placeholder='Enter comment'
                    />
                  </div>
                </div>

                {/* ACTION MODAL FOR RESOLVE REJECT AND TRANSFER COMPONENT */}
                <Dialog open={isDialogOpen}>
                  <DialogHeader></DialogHeader>
                  <DialogContent className='sm:max-w-[500px]'>
                    <div className='py-4'>
                      {actionComponentStatus === 1 && (
                        <ResolveComponent
                          setisDialogOpen={setisDialogOpen}
                          actionPermissions={actionPermissions}
                          complaintData={complaintData}
                        />
                      )}
                      {actionComponentStatus === 2 && (
                        <RejectComponent
                          setisDialogOpen={setisDialogOpen}
                          actionPermissions={actionPermissions}
                          complaintData={complaintData}
                        />
                      )}
                      {actionComponentStatus === 3 && (
                        <WorkflowMemberComponent
                          setisDialogOpen={setisDialogOpen}
                          complaintData={complaintData}
                          actionPermissions={actionPermissions}
                        />
                      )}
                      {actionComponentStatus === 4 && (
                        <TransferToUlb
                          setisDialogOpen={setisDialogOpen}
                          complaintData={complaintData}
                        />
                      )}
                    </div>
                  </DialogContent>

                  <div className='mt-4 flex flex-wrap items-center justify-between'>
                    <div className='mr-10'>
                      {complaintData?.data?.data?.wf_status === 1 && (
                        <CardTitle className='mb-4 flex items-center'>
                          <CircleCheckBig className='mr-2 inline text-green-500' />
                          Grievance Resolved
                        </CardTitle>
                      )}
                      {complaintData?.data?.data?.wf_status === 2 && (
                        <CardTitle className='mb-4 flex items-center'>
                          <CircleX className='mr-2 inline text-red-500' />
                          Grievance Rejected
                        </CardTitle>
                      )}

                      {(complaintData?.data?.data?.wf_status === 0 ||
                        complaintData?.data?.data?.wf_status === 3) && (
                          <div className='mb-4 flex items-center space-x-2'>
                            <RHFTextField
                              checked={complaintData?.data?.data?.isEscalated}
                              onChange={(e) => escalateAction(e)}
                              className='h-5 w-5 cursor-pointer'
                              type='checkbox'
                              name='isTransactionIssue'
                              placeholder=''
                            />
                            <Label className='text-amber-700 opacity-80'>
                              {complaintData?.data?.data?.isEscalated
                                ? 'De-Escalate'
                                : 'Escalate'}
                            </Label>
                          </div>
                        )}
                    </div>

                    <div className='flex justify-end'>
                      <div className='col-span-4'>
                        <ButtonLoading
                          variant={'secondary'}
                          name='comment'
                          className='mr-4'
                          type='submit'
                          disabled={mutate.isPending}
                          isLoading={mutate.isPending}
                        >
                          Direct Comment
                        </ButtonLoading>
                      </div>

                      {/* ═══════════════════║ THIS SHOWS ACTION BUTTONS WHEN NOT APROVED ║════════════════════════ */}
                      {(complaintData?.data?.data?.wf_status === 0 ||
                        complaintData?.data?.data?.wf_status === 3) && (
                          <>
                            {actionPermissions?.data?.permission
                              ?.isNeededMoreDocuments && (
                                <div className='col-span-4'>
                                  <DialogTrigger
                                    onClick={() => {
                                      setisDialogOpen(true)
                                      setActionComponentStatus(1)
                                    }}
                                    asChild
                                  >
                                    <Button
                                      variant={'secondary'}
                                      name='bts'
                                      className='mr-4'
                                      disabled={mutate.isPending}
                                    >
                                      Need More Documents
                                    </Button>
                                  </DialogTrigger>
                                </div>
                              )}
                            {actionPermissions?.data?.permission?.canResolve && (
                              <div className='col-span-4'>
                                <DialogTrigger
                                  onClick={() => {
                                    setisDialogOpen(true)
                                    setActionComponentStatus(1)
                                  }}
                                  asChild
                                >
                                  <Button
                                    variant={'secondary'}
                                    name='bts'
                                    className='mr-4'
                                    disabled={mutate.isPending}
                                  >
                                    Resolve
                                  </Button>
                                </DialogTrigger>
                              </div>
                            )}
                            {actionPermissions?.data?.permission?.canReject && (
                              <div className='col-span-4'>
                                <DialogTrigger
                                  onClick={() => {
                                    setisDialogOpen(true)
                                    setActionComponentStatus(2)
                                  }}
                                  asChild
                                >
                                  <Button
                                    variant={'secondary'}
                                    name='reject'
                                    className='mr-4'
                                    disabled={mutate.isPending}
                                  >
                                    Reject
                                  </Button>
                                </DialogTrigger>
                              </div>
                            )}

                            {actionPermissions?.data?.permission
                              ?.canTransferToMember && (
                                <div className='col-span-4'>
                                  <DialogTrigger
                                    onClick={() => {
                                      setisDialogOpen(true)
                                      setActionComponentStatus(3)
                                    }}
                                    asChild
                                  >
                                    <Button
                                      name='approve'
                                      disabled={mutate.isPending}
                                      className='mr-4'
                                    >
                                      Transfer to Current Member
                                    </Button>
                                  </DialogTrigger>
                                </div>
                              )}
                            {actionPermissions?.data?.permission
                              ?.canSendToUlb && (
                                <div className='col-span-4'>
                                  <DialogTrigger
                                    onClick={() => {
                                      setisDialogOpen(true)
                                      setActionComponentStatus(4)
                                    }}
                                    asChild
                                  >
                                    <Button
                                      name='approve'
                                      disabled={mutate.isPending}
                                      type='button'
                                      className='mr-4'
                                    >
                                      Transfer to Ulb
                                    </Button>
                                  </DialogTrigger>
                                </div>
                              )}
                            {actionPermissions?.data?.permission
                              ?.canTransferToWorkflow && (
                                <div className='col-span-4'>
                                  <Link
                                    to={`/bug-log/dashboard/transfer-complaint?parentId=null&levelSerial=1&complaintId=${complaintData?.data?.data?._id}&complaintRefNo=${complaintData?.data?.data?.complaintRefNo}`}
                                  >
                                    <Button
                                      name='approve'
                                      disabled={mutate.isPending}
                                      type='button'
                                    >
                                      Transfer to Workflow
                                    </Button>
                                  </Link>
                                </div>
                              )}
                          </>
                        )}
                    </div>
                  </div>
                </Dialog>
              </FormProviders>
            </div>

            <div className='col-span-1 h-80 overflow-y-scroll md:px-4'>
              <CardTitle className='mb-2'>Comments</CardTitle>
              {complaintAllComments?.data?.data?.data?.map(
                (comment: any, index: number) => (
                  <CommentCard commentData={comment} key={`comment${index}`} />
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
