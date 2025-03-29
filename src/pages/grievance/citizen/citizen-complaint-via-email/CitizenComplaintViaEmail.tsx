// import toast from 'react-hot-toast'
// import { useForm } from 'react-hook-form'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { Button } from '@/components/ui/button'
// import {
//   ButtonLoading,
//   FormProviders,
//   SelectField,
// } from '@/components/forms'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
// } from '@/components/ui/card'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { useApi, useGetMutation } from '@/hooks/useCustomQuery'
// import { grievanceAPI } from '@/lib'
// import { Label } from '@/components/ui/label'

// const schema = yup.object().shape({
//   ulbId: yup.string().required('ulbId is Required'),
// })

// export default function CitizenReviewForm() {
//   const postMutation = useGetMutation();
//   const methods = useForm<any>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: any) => {
//     try {

//       const res = await postMutation.mutateAsync({
//         api: `${grievanceAPI?.citizenFindNewHolding}`,
//         data: {
//           ulbId: data?.ulbId,
//         }
//       })
//       if (res.data?.status) {
//         toast.success(res?.data?.message)
//       } else {
//         toast.error(res?.data?.message)
//       }
//       methods.reset({
//         oldHoldingNo: '',
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getUlbData = useApi<any>({
//     api: `${grievanceAPI?.getAllUlbDirect}?page=1&limit=10000`,
//     key: 'getAllUlbDirect',
//     options: {
//       enabled: true,
//       refetchOnMount: false
//     },
//   })


//   const openGmail = (emailId: any) => {
//     console.log("getAllUlbDirect", emailId);
//     // const email = "talibplay222@gmail.com"
//     // const email = "aadrikaent270@gmail.com"
//     const email = emailId
//     const subject = "Compalint registration"
//     const body = `Dear Sir,
//     --Write your complaint here--`
//     const encodedSubject = encodeURIComponent(subject);
//     const encodedBody = encodeURIComponent(body);
//     window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`, '_blank')
//   }

//   return (
//     <div className="w-full md:w-8/12 p-2 mx-auto">
//       <div className="mt-4">
//         <h1 className="text-blue-800 font-bold text-2xl underline mb-2">Ulb Wise Grievance via Email</h1>
//       </div>
//       <Card>
//         {/* <CardHeader className='px-7'>
//           <CardDescription>
//             <FormProviders
//               methods={methods}
//               onSubmit={methods.handleSubmit(onSubmit)}
//             >
//               <div className='md:px-24 space-y-4'>
//                 <div className='sm:flex  items-center justify-start gap-4'>
//                   <div className='sm:w-1/2'>
//                     <div>
//                       <Label htmlFor="ulbId">Select Your Ulb</Label>
//                       <SelectField className='bg-background cursor-pointer' name='ulbId' data={
//                         getUlbData.data?.data?.map((item: any) => {
//                           return {
//                             value: item?._id,
//                             label: item?.ulbName,
//                           }
//                         }) ?? []
//                       }
//                       />
//                     </div>
//                   </div>
//                   <div className=''>
//                     <ButtonLoading
//                       isLoading={methods.formState.isSubmitting}
//                       type='submit'
//                       className='mt-4 w-auto rounded-xl px-10 py-5 float-right'
//                     >
//                       Search
//                     </ButtonLoading>
//                   </div>
//                 </div>
//               </div>
//             </FormProviders>
//           </CardDescription>
//         </CardHeader> */}
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className=''>#</TableHead>
//                 <TableHead className=''>Ulb Name</TableHead>
//                 <TableHead className=''>Mail</TableHead>
//                 <TableHead className=''>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {getUlbData.data?.data?.map((items: any, index: any) => (
//                 <TableRow key={items._id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{items?.ulbName}</TableCell>
//                   <TableCell className='' >{items?.email || "N/A"}</TableCell>
//                   <TableCell onClick={(() => { openGmail(items?.email) })}><Button> Mail Now</Button></TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import {
  ButtonLoading,
  FormProviders,
  SelectField,
} from '@/components/forms'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useApi, useGetMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useAppContext } from "@/context";



const schema = yup.object().shape({
  ulbId: yup.string().required('ulbId is Required'),
})

export default function CitizenReviewForm() {
  const postMutation = useGetMutation()
  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })

  const { currentLanguage } :any= useAppContext();

  console.log('the glboal lanauage...', currentLanguage)

  const onSubmit = async (data: any) => {
    try {
      const res = await postMutation.mutateAsync({
        api: `${grievanceAPI?.citizenFindNewHolding}`,
        data: {
          ulbId: data?.ulbId,
        },
      })
      if (res.data?.status) {
        toast.success(res?.data?.message)
      } else {
        toast.error(res?.data?.message)
      }
      methods.reset({
        oldHoldingNo: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getUlbData = useApi<any>({
    api: `${grievanceAPI?.getAllUlbDirect}?page=1&limit=10000`,
    key: 'getAllUlbDirect',
    options: {
      enabled: true,
      refetchOnMount: false,
    },
  })

  // State for search and sort
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
    key: 'ulbName',
    direction: 'asc',
  })

  // Filter ULB data based on search
  const filteredUlbData = getUlbData.data?.data?.filter((item: any) => {
    return item?.ulbName.toLowerCase().includes(searchTerm.toLowerCase())
  }) || []

  // Sort function
  const sortedUlbData = [...filteredUlbData].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key]?.localeCompare(b[sortConfig.key]) || 0
    } else if (sortConfig.direction === 'desc') {
      return b[sortConfig.key]?.localeCompare(a[sortConfig.key]) || 0
    }
    return 0
  })

  // Toggle sorting order
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // Function to open Gmail
  // const openGmail = (emailId: any) => {
  //   const email = emailId
  //   const subject = "Complaint registration"
  //   const body = `Dear Sir,\n--Write your complaint here--`
  //   const encodedSubject = encodeURIComponent(subject)
  //   const encodedBody = encodeURIComponent(body)
  //   window.open(
  //     `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`,
  //     '_blank'
  //   )
  // }
  const openGmail = () => {
    const email = "support@ranchimunicipal.com"
    const subject = "Complaint registration"
    const body = `Dear Sir,\n--Write your complaint here--`
    const encodedSubject = encodeURIComponent(subject)
    const encodedBody = encodeURIComponent(body)
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`,
      '_blank'
    )
  }

  return (
    <div className="w-full md:w-8/12 p-2 mx-auto">
      <div className="mt-4">
        <h1 className="text-blue-800 font-bold text-2xl underline mb-2">
       { currentLanguage?.MAIL_HEAD}
        </h1>
      </div>
      <Card>
        <CardContent>
          {/* Search Box */}
          {/* <div className="mb-4 py-2">
            <input
              type="text"
              placeholder="Search by ULB Name..."
              className="w-64 px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div> */}

          {/* Table of ULBs */}
          {/* <Table>
            <TableHeader>
              <TableRow>
              <TableHead className="cursor-pointer" >
                  Serial No.
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort('ulbName')}>
                  Ulb Name {sortConfig.key === 'ulbName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="cursor-pointer">
                  Mail 
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUlbData?.length > 0 ? (
                sortedUlbData.map((items: any, index: any) => (
                  <TableRow key={items._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{items?.ulbName}</TableCell>
                    <TableCell>{items?.email || 'N/A'}</TableCell>
                    <TableCell onClick={() => openGmail(items?.email)}>
                      <Button>Mail Now</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table> */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" >
                {currentLanguage?.SERIAL_NUM}
                </TableHead>
                <TableHead >
                {currentLanguage?.CONTACT_TO}
                </TableHead>
                <TableHead className="cursor-pointer">
                {currentLanguage?.CONTACT_NUM}
                </TableHead>
                <TableHead>{currentLanguage?.ACTION}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>{currentLanguage?.STATE_NAME}</TableCell>
                <TableCell>support@ranchimunicipal.com</TableCell>
                <TableCell onClick={() => openGmail()}>
                  <Button>{currentLanguage?.MAIL}</Button>
                </TableCell>
              </TableRow>
             </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

