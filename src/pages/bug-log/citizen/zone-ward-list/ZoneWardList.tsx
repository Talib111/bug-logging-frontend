// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  // CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// import { useState } from "react";
// import { district, ZoneWardListData } from './JSONDATA';
import { usePostMutationJuidco } from "@/hooks/useCustomQuery";
import { grievanceAPI } from "@/lib";
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  // RHFTextField,
  FormProviders,
  SelectField,
} from '@/components/forms'
import { Label } from '@/components/ui/label'
import { useApi } from '@/hooks/useCustomQuery'
import { useAppContext } from '@/context';

const schema = yup.object().shape({
  ulbId: yup.string().required('ulbId is Required'),

})

export default function ZoneWardList() {
    const { currentLanguage }: any = useAppContext();  // Get the current language
  
  const postMutation = usePostMutationJuidco({})
  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: any) => {
    try {

      const res = await postMutation.mutateAsync({
        api: `${grievanceAPI?.citizenFindNewHolding}`,
        data: {
          ulbId: data?.ulbId,
        }
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
    api: `${grievanceAPI?.getAllUlb}?page=1&limit=10000`,
    key: 'getAllUlb',
    options: {
      enabled: true,
    },
  })
  return (
    <div className="w-full md:w-8/12 p-2 mx-auto">
      <div className="mt-4">
        <h1 className="text-blue-800 font-bold text-2xl underline mb-2">{currentLanguage?.ULB_WW_LIST}</h1>
      </div>


      <Card>
        <CardHeader className='px-7'>
          <CardDescription>
            <FormProviders
              methods={methods}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className='md:px-24 space-y-4'>
                <div className='sm:flex  items-center justify-start gap-4'>
                  <div className='sm:w-1/2'>
                    <div>
                      <Label htmlFor="ulbId"></Label>
                      <SelectField className='bg-background cursor-pointer' name='ulbId' data={
                        getUlbData.data?.data?.docs?.map((item: any) => {
                          return {
                            value: item?._id,
                            label: item?.ulbName,
                          }
                        }) ?? []
                      }
                      />
                    </div>
                  </div>
                  <div className=''>
                    <ButtonLoading
                      isLoading={methods.formState.isSubmitting}
                      type='submit'
                      className='mt-4 w-auto rounded-xl px-10 py-5 float-right'
                    >
                      {currentLanguage?.SRCH}
                    </ButtonLoading>
                  </div>
                </div>
              </div>
            </FormProviders>

            {/* <Select >
              <SelectTrigger className="md:w-[280px] ">
                <SelectValue placeholder="Select Your District" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {district.map((items) => (
                    <SelectItem key={items.districtId} value={items.districtId.toString()}>
                      {items.districtName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className=''>#</TableHead>
                  <TableHead className=''>{currentLanguage?.ZN_NAME}</TableHead>
                  <TableHead className=''>{currentLanguage?.WD_NAME}</TableHead>
                  <TableHead className=''>{currentLanguage?.ADDR_AT}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>

  )
}
