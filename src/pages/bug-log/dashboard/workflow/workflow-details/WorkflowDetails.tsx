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
import {
  MODULE_PROPERTY,
  MODULE_WATER,
  MODULE_TRADE,
  MODULE_PET_REGISTRATION,
  MODULE_OTHERS,
  MODULE_GRIEVANCE,
  MODULE_SWM,
  MODULE_WATER_TANKER,
  MODULE_ADVERTISEMENT,
  MODULE_SEPTIC_TANK,
  MODULE_LODGE_BANQUET,
  MODULE_MARRIAGE_REGISTRATION,
  MODULE_PUBLIC_TRANSPORT,
  MODULE_PARKING_MANAGEMENT,
  MODULE_RIG_MACHINE,
} from '@/../config/module.config'
import {
  MODULE_PROPERTY_LINK,
  MODULE_WATER_LINK,
  MODULE_TRADE_LINK,
  MODULE_PET_REGISTRATION_LINK,
  MODULE_OTHERS_LINK,
  MODULE_GRIEVANCE_LINK,
  MODULE_SWM_LINK,
  MODULE_WATER_TANKER_LINK,
  MODULE_ADVERTISEMENT_LINK,
  MODULE_SEPTIC_TANK_LINK,
  MODULE_LODGE_BANQUET_LINK,
  MODULE_MARRIAGE_REGISTRATION_LINK,
  MODULE_PUBLIC_TRANSPORT_LINK,
  MODULE_PARKING_MANAGEMENT_LINK,
  MODULE_RIG_MACHINE_LINK,
} from '@/../config/moduleLinks.config'

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
  const [isFlowHistoryVisible, setisFlowHistoryVisible] = useState(false)
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

  //══════════║THIS FUNCTION DYNAMICALLY SETS THE LINK AND LABEL TEXT TO SEARCH MODULE DETAILS ║═════════════
  const createModuleSearchLink = () => {
    //1 PROPERTY
    if (complaintData?.data?.data?.moduleId === MODULE_PROPERTY) {
      setsearchLink(MODULE_PROPERTY_LINK)
      setsearchLabel('Search Property Details')
    }
    //2 WATER
    if (complaintData?.data?.data?.moduleId === MODULE_WATER) {
      setsearchLink(MODULE_WATER_LINK)
      setsearchLabel('Search Water Details')
    }
    //3 TRADE
    if (complaintData?.data?.data?.moduleId === MODULE_TRADE) {
      setsearchLink(MODULE_TRADE_LINK)
      setsearchLabel('Search Trade Details')
    }
    //4 PET REGISTRATION
    if (complaintData?.data?.data?.moduleId === MODULE_PET_REGISTRATION) {
      setsearchLink(MODULE_PET_REGISTRATION_LINK)
      setsearchLabel('Search Pet Registration Details')
    }
    //5 OTHERS
    if (complaintData?.data?.data?.moduleId === MODULE_OTHERS) {
      setsearchLink(MODULE_OTHERS_LINK)
      setsearchLabel('Search Other Details')
    }
    //6 GREIVANCE
    if (complaintData?.data?.data?.moduleId === MODULE_GRIEVANCE) {
      setsearchLink(MODULE_GRIEVANCE_LINK)
      setsearchLabel('Search Grievance Details')
    }
    //7 SWM
    if (complaintData?.data?.data?.moduleId === MODULE_SWM) {
      setsearchLink(MODULE_SWM_LINK)
      setsearchLabel('Search SWM Details')
    }
    //8 WATER TANKER
    if (complaintData?.data?.data?.moduleId === MODULE_WATER_TANKER) {
      setsearchLink(MODULE_WATER_TANKER_LINK)
      setsearchLabel('Search Water Tanker Details')
    }
    //9 ADVERTISEMENT
    if (complaintData?.data?.data?.moduleId === MODULE_ADVERTISEMENT) {
      setsearchLink(MODULE_ADVERTISEMENT_LINK)
      setsearchLabel('Search Advertisement Details')
    }
    //10 SEPTIC TANK
    if (complaintData?.data?.data?.moduleId === MODULE_SEPTIC_TANK) {
      setsearchLink(MODULE_SEPTIC_TANK_LINK)
      setsearchLabel('Search Septic Tank Details')
    }
    //11 LODGE BANQUET
    if (complaintData?.data?.data?.moduleId === MODULE_LODGE_BANQUET) {
      setsearchLink(MODULE_LODGE_BANQUET_LINK)
      setsearchLabel('Search Lodge/Banquet Details')
    }
    //12 MARRAIGE REGISTRATION
    if (complaintData?.data?.data?.moduleId === MODULE_MARRIAGE_REGISTRATION) {
      setsearchLink(MODULE_MARRIAGE_REGISTRATION_LINK)
      setsearchLabel('Search Marriage Details')
    }
    //13 PUBLIC TRANSPORT
    if (complaintData?.data?.data?.moduleId === MODULE_PUBLIC_TRANSPORT) {
      setsearchLink(MODULE_PUBLIC_TRANSPORT_LINK)
      setsearchLabel('Search Public Transport Details')
    }
    //14 PARKING MANAGEMENT
    if (complaintData?.data?.data?.moduleId === MODULE_PARKING_MANAGEMENT) {
      setsearchLink(MODULE_PARKING_MANAGEMENT_LINK)
      setsearchLabel('Search Parking Details')
    }
    //15 RIG MACHINE
    if (complaintData?.data?.data?.moduleId === MODULE_RIG_MACHINE) {
      setsearchLink(MODULE_RIG_MACHINE_LINK)
      setsearchLabel('Search Rig Details')
    }
  }

  useEffect(() => {
    createModuleSearchLink()
  }, [complaintData?.data])

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
                  Grievance No : {complaintData?.data?.data?.complaintRefNo}
                </h1>
                {complaintData?.data?.data?.workflow?.workFlowName && (
                  <h1 className='text- Capitalize  mb-6 font-bold'>
                    <span className='opacity-60'>Current Stage : </span>
                    {complaintData?.data?.data?.workflow?.workFlowName}
                  </h1>
                )}
                {!complaintData?.data?.data?.workflow?.workFlowName && (
                  <h1 className='text- Capitalize  mb-6 font-bold'>
                    <span className='opacity-60'>Current Stage : </span>
                    {complaintData?.data?.data?.currentUser &&
                      `${complaintData?.data?.data?.currentUser?.fullName} `}
                    {complaintData?.data?.data?.currentWorkflow &&
                      `(${complaintData?.data?.data?.currentWorkflow?.workFlowName})`}
                    {!complaintData?.data?.data?.currentWorkflow &&
                      !complaintData?.data?.data?.currentUser &&
                      complaintData?.data?.data?.moduleId === MODULE_OTHERS &&
                      'State GRO'}
                    {!complaintData?.data?.data?.currentWorkflow &&
                      !complaintData?.data?.data?.currentUser &&
                      complaintData?.data?.data?.moduleId !== MODULE_OTHERS &&
                      'ULB GRO'}
                  </h1>
                )}
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
                  <div className='font-semibold'>Full Name : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.citizenName || 'N/A'}
                    </p>{' '}
                  </div>
                </div>
                <div className='flex items-center  space-x-4'>
                  <div className='font-semibold'>Mobile No : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.mobileNo || 'N/A'}
                    </p>{' '}
                  </div>
                </div>
                <div className='flex items-center  space-x-4'>
                  <div className='font-semibold'>Email : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.email || 'N/A'}
                    </p>{' '}
                  </div>
                </div>
                <div className='flex items-center  space-x-4'>
                  <div className='font-semibold'>ULB : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.ulb?.ulbName}
                    </p>{' '}
                  </div>
                </div>
                <div className='flex items-center  space-x-4'>
                  <div className='font-semibold'>Grievance Type : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.problemType?.problem || 'N/A'}
                    </p>{' '}
                  </div>
                </div>

               
                {(complaintData?.data?.data?.holdingNo ||
                  complaintData?.data?.data?.safNo ||
                  complaintData?.data?.data?.consumerNo) && 
                  <>
                    {complaintData?.data?.data?.holdingNo && (
                      <div className='flex items-center space-x-4'>
                        <div className='font-semibold'>Holding No:</div>
                        <div>
                          <p className='opacity-90'>
                            {complaintData.data.data.holdingNo}
                          </p>
                        </div>
                      </div>
                    )}

                    {complaintData?.data?.data?.safNo && (
                      <div className='flex items-center space-x-4'>
                        <div className='font-semibold'>SAF No:</div>
                        <div>
                          <p className='opacity-90'>
                            {complaintData.data.data.safNo}
                          </p>
                        </div>
                      </div>
                    )}
                    {complaintData?.data?.data?.consumerNo && (
                      <div className='flex items-center space-x-4'>
                        <div className='font-semibold'>Consumer No:</div>
                        <div>
                          <p className='opacity-90'>
                            {complaintData.data.data.consumerNo}
                          </p>
                        </div>
                      </div>
                    )}
                    </>
                }

                
                {complaintData?.data?.data?.fixedNo && (
                  <div className='flex items-center  space-x-4'>
                    <div className='font-semibold'>
                      {complaintData?.data?.data?.fixedNoLabel} :{' '}
                    </div>
                    <div>
                      <p className='opacity-90'>
                        {complaintData?.data?.data?.fixedNo}
                      </p>{' '}
                    </div>
                  </div>
                )}
                {complaintData?.data?.data?.tempNo && (
                  <div className='flex items-center  space-x-4'>
                    <div className='font-semibold'>
                      {complaintData?.data?.data?.tempNoLabel} :{' '}
                    </div>
                    <div>
                      <p className='opacity-90'>
                        {complaintData?.data?.data?.tempNo}
                      </p>{' '}
                    </div>
                  </div>
                )}
                {(complaintData?.data?.data?.wf_status === 0 ||
                  complaintData?.data?.data?.wf_status === 3) && (
                  <div className='flex items-center  space-x-4'>
                    <div className='font-semibold'>Pending From : </div>
                    <div>
                      <p className='opacity-90'>
                        {moment().diff(
                          moment(complaintData?.data?.data?.createdAt),
                          'days'
                        )}{' '}
                        days
                      </p>{' '}
                    </div>
                  </div>
                )}
                {complaintData?.data?.data?.priorityType && (
                  <div className='flex items-center  space-x-4'>
                    <div className='font-semibold'>Priority Type : </div>
                    <div>
                      <p className='opacity-90'>
                        {complaintData?.data?.data?.priorityType?.priorityName}
                      </p>{' '}
                    </div>
                  </div>
                )}
                {complaintData?.data?.data?.targetType && (
                  <div className='flex items-center  space-x-4'>
                    <div className='font-semibold'>Target Type : </div>
                    <div>
                      <p className='opacity-90'>
                        {complaintData?.data?.data?.targetType?.targetType ||
                          'N/A'}
                      </p>{' '}
                    </div>
                  </div>
                )}
                {complaintData?.data?.data?.complaintType && (
                  <div className='flex items-center  space-x-4'>
                    <div className='font-semibold'>Grievance Type : </div>
                    <div>
                      <p className='opacity-90'>
                        {
                          complaintData?.data?.data?.complaintType
                            ?.complaintTypeName
                        }
                      </p>{' '}
                    </div>
                  </div>
                )}
                <div className='col-span-3 my-20 border-b border-[#99B37C]'></div>
                {/* <div className='col-span-2 flex flex-col'>
                  <div className='font-semibold'>Title : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.complaintTitle || 'N/A'}
                    </p>{' '}
                  </div>
                </div> */}
                <div className='col-span-2 flex flex-col'>
                  <div className='font-semibold'>Description : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.complaintDescription}
                    </p>{' '}
                  </div>
                </div>
                {/* <div className='col-span-2 flex flex-col'>
                  <div className='font-semibold'>Remark : </div>
                  <div>
                    <p className='opacity-90'>
                      {complaintData?.data?.data?.wf_currentReopenComment}
                    </p>{' '}
                  </div>
                </div> */}

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
                  <div className='font-semibold'>Grievance Document:</div>
                  <Dialog>
                    <DialogHeader></DialogHeader>
                    <DialogContent className='sm:max-w-[500px]'>
                      <div className='py-4'>
                        {/* Check if the uploaded file is an image */}
                        {complaintData?.data?.data?.imgUrl &&
                        complaintData?.data?.data?.imgUrl.includes('.pdf') ? (
                          <iframe
                            src={complaintData?.data?.data?.imgUrl}
                            width='100%'
                            height='400px'
                            title='Document Preview'
                          />
                        ) : (
                          <Image
                            src={complaintData?.data?.data?.imgUrl}
                            className='w-80'
                          />
                        )}
                      </div>
                    </DialogContent>
                    {/* IMAGE TRIGGER */}
                    <DialogTrigger asChild>
                      <div className='cursor-pointer'>
                        {complaintData?.data?.data?.imgUrl &&
                        complaintData?.data?.data?.imgUrl.includes('.pdf') ? (
                          <div className='flex h-20  w-20 items-center justify-center'>
                            {' '}
                            <FileText className='h-20 w-20 ' />
                          </div>
                        ) : (
                          <Image
                            src={complaintData?.data?.data?.imgUrl}
                            className='w-40'
                          />
                        )}
                      </div>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </div>

              <section className='mt-8'>
                <div className='flex justify-between'>
                  <h2 className='text-xl font-semibold text-blue-800'>
                    Grievance Flow History{' '}
                    <span
                      onClick={() =>
                        setisFlowHistoryVisible(!isFlowHistoryVisible)
                      }
                      className='cursor-pointer'
                    >
                      {!isFlowHistoryVisible && (
                        <span className='rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-400 hover:bg-gray-200 '>
                          Show <ChevronUp size={15} className='inline' />
                        </span>
                      )}
                      {isFlowHistoryVisible && (
                        <span className='rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-400 hover:bg-gray-200 '>
                          Hide <ChevronDown size={15} className='inline' />
                        </span>
                      )}
                    </span>{' '}
                  </h2>

                  <h1 className='text-md mb-6  flex items-center font-bold'>
                  <span>
                    Reminder -
                      <Badge className="ml-2 w-20 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                      >{complaintData?.data?.data?.reminder}Times</Badge>
                    
                    {/* {complaintData?.data?.data?.wf_status === 1 && (
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
                    )} */}
                  </span>
                </h1>

                  {actionPermissions?.data?.permission?.canMoveComplaint && (
                    <Button onClick={moveComplaintToMe}>
                      Move Grievance to my Panel
                    </Button>
                  )}
                  {actionPermissions?.data?.permission?.canUpdate && (
                    <Link
                      to={`/bug-log/dashboard/management-complaint-form?complaintId=${complaintData?.data?.data?._id}`}
                    >
                      <Button>Update Details</Button>
                    </Link>
                  )}
                </div>
                <div className='mt-1 border-b border-[#99B37C]'></div>
                {isFlowHistoryVisible && (
                  <div className='mt-4 flex flex-col space-y-4'>
                    {complaintLogData?.data?.data?.map(
                      (item: any, index: any) => (
                        <div
                          key={`flow${index}`}
                          className='flex items-center space-x-4'
                        >
                          <div>{index + 1}</div>
                          <div>
                            {item?.actionStatus === 0 && (
                              <Badge className='text-dark bg-gray-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 1 && (
                              <Badge className='bg-green-400 text-white'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 2 && (
                              <Badge className='bg-red-400 text-white'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 3 && (
                              <Badge>{item?.statusText}</Badge>
                            )}
                            {item?.actionStatus === 4 && (
                              <Badge className='text-dark bg-amber-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 5 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 6 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 7 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 8 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 9 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 10 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 11 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            {item?.actionStatus === 12 && (
                              <Badge className='text-dark bg-cyan-200'>
                                {item?.statusText}
                              </Badge>
                            )}
                            <div className='mt-1 text-xs font-semibold text-gray-600'>
                              {moment(
                                complaintData?.data?.data?.createdAt
                              ).format('DD-MM-YYYY hh:mm a')}
                            </div>
                          </div>
                          <MoveRight />
                          <div>
                            <Dialog>
                              <DialogHeader></DialogHeader>
                              <DialogContent className='sm:max-w-[500px]'>
                                <div className='py-4'>
                                  <Image
                                    src={item?.actionBy?.fullImgUrl}
                                    className='w-60'
                                  />
                                </div>
                              </DialogContent>

                              {/* IMAGE TRIGGER */}
                              <DialogTrigger asChild>
                                <div className='h-10 w-10 cursor-pointer overflow-hidden rounded-full border'>
                                  <Image
                                    src={item?.actionBy?.fullImgUrl || profile}
                                    className='w-10 cursor-pointer hover:scale-105'
                                  />
                                </div>
                              </DialogTrigger>
                            </Dialog>
                            <div className='text-xs text-gray-700'>
                              Action by{' '}
                              <span className='text-md font-semibold text-black'>
                                {item?.actionByUserId === null
                                  ? 'Direct Citizen'
                                  : item?.actionBy?.fullName}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </section>
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
