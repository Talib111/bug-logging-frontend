import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextField,
  SelectField
} from '@/components/forms'
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { CardTitle } from '@/components/ui/card'
import { CircleHelp } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'

const schema = yup.object().shape({
  module: yup.string().required('Select module'),
  tempNo: yup.string(),
  fixedNo: yup.string(),
  isTransactionIssue: yup.string(),
  transactionNo: yup.string(),
})


export default function ModuleForm({ setformStep, setcomplaintData, complaintData }: any) {
  const [isTransactionIssue, setisTransactionIssue] = useState<boolean>(false)
  const [tempNoLabel, settempNoLabel] = useState<string>('')
  const [fixedNoLabel, setfixedNoLabel] = useState<string>('')
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      module: complaintData?.module,
      // moduleName: '',
      moduleName: complaintData?.moduleName,
      tempNo: complaintData?.tempNo,
      fixedNo: complaintData?.fixedNo,
      isTransactionIssue: complaintData?.isTransactionIssue || false,
      transactionNo: complaintData?.transactionNo
    }
  })

  const onSubmit = async (data: any) => {
    setcomplaintData({
      ...complaintData,
      module: data.module,
      moduleName: data?.moduleName,
      tempNo: data?.tempNo,
      fixedNo: data?.fixedNo,
      tempNoLabel,
      fixedNoLabel,
      isTransactionIssue: data?.isTransactionIssue,
      transactionNo: data?.transactionNo,
    })
    setformStep(3)
  }

  const moduleData = useApi<any>({
    api: `${grievanceAPI.getAllModuleDirect}?page=1&limit=10000`,
    key: 'getAllModuleDirect',
    options: {
      enabled: true,
      refetchOnMount: false
    },
  })

  useEffect(() => {
    if (methods.watch('module')) {
      const [selectedData] = moduleData.data?.data?.filter((item: any) => {
        return item?._id === methods?.watch('module')
      })
      setfixedNoLabel(selectedData?.fixedNoLabel)
      settempNoLabel(selectedData?.tempNoLabel)
    }
  }, [methods.watch('module')])

  useEffect(() => {
    setisTransactionIssue(methods.watch('isTransactionIssue'))
  }, [methods.watch('isTransactionIssue')])


  return (
    <Popover>

      <PopoverContent className="w-80 border border-indigo-600">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Service
            </h4>
            <div className="flex  space-x-4">
              <div className="text-sm text-muted-foreground">
                Serivce is the government service for which you are registering complaint, eg: Holding, Water, Trade and choose others for other category.
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>


      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='gap-x-2 gap-y-4 px-10 py-10'>
          <div>
            <CardTitle className='text-2xl mb-10 flex items-center font-bold'>Service Information<PopoverTrigger asChild>
              <CircleHelp size={20} className="inline cursor-pointer ml-4" />
            </PopoverTrigger></CardTitle>

            <div>
              <Label><span className='text-red-500'>*</span>Select Service</Label>
              <SelectField selectedText='moduleName' className='bg-background cursor-pointer' name='module' data={
                moduleData.data?.data?.map((item: any) => {
                  return {
                    value: item?._id,
                    label: item?.moduleName,
                  }
                }) ?? []
              }
              />
            </div>

            {/* // THIS IS MODULE SPECIFIC DYNAMIC INPUT FIELDS */}
            {fixedNoLabel && <div className='mt-4'>
              <Label>{fixedNoLabel}<span className='text-xs opacity-80'></span></Label>
              <RHFTextField name='fixedNo' placeholder='' />
            </div>}
            {tempNoLabel && <div className='mt-4'>
              <Label>{tempNoLabel}<span className='text-xs opacity-80'></span></Label>
              <RHFTextField name='tempNo' placeholder='' />
            </div>}
            <div className='mt-6 flex items-center space-x-2'>
              <RHFTextField className='cursor-pointer h-5 w-5' type='checkbox' name='isTransactionIssue' placeholder='' />
              <Label className='text-amber-600 opacity-80'>Is issue related with financial transaction</Label>
            </div>

            {isTransactionIssue && <div className='mt-4'>
              <Label>Transaction No.</Label>
              <RHFTextField name='transactionNo' placeholder='' />
            </div>}

          </div>

          <div className='mt-4'>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className=' w-full'
            >
              Next
            </ButtonLoading>
          </div>

        </div>


      </FormProviders>
    </Popover>
  )
}
