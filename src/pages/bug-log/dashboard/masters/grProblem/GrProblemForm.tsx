''
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  SelectField,
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_PROBLEM_TYPE_VIEW } from './type'
import { I_GR_DEPARTMENT_TYPE_LIST } from '../grDepartment/type'

const schema = yup.object().shape({
  problem: yup.string().required('Role name is required'),
  departmentId: yup.string().required('Description is required'),
  sla1: yup.string().required('Description is required'),
  sla2: yup.string().required('Description is required'),
  sla3: yup.string().required('Description is required'),
})
type FormData = yup.InferType<typeof schema>

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  id?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

export default function RoleForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const postMutation = usePostMutation({})
  const putMutation = usePutMutation({})
  const { data, isFetching } = useApi<I_PROBLEM_TYPE_VIEW>({
    api: `${grievanceAPI.getProblemById}/${id}`,
    key: 'getRoleById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: {
      problem: '',
      departmentId: '',
      sla1: '',
      sla2: '',
      sla3: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateProblem}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Role not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createProblem,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Role not created successfully')
        }
        methods.reset({
          problem: '',
          departmentId: '',
          sla1: '',
          sla2: '',
          sla3: '',
        })
      }
      setOpen(false)
      setEdit!(false)
      refetch!()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (edit && data) {
      methods.reset({
        problem: data.data.problem,
        departmentId: data.data.departmentId,
        sla1: data.data.sla1,
        sla2: data.data.sla2,
        sla3: data.data.sla3,
      })
    } else {
      methods.reset({
        problem: '',
        departmentId: '',
        sla1: '',
        sla2: '',
        sla3: '',
      })
    }
  }, [edit, data])

    const department = useApi<I_GR_DEPARTMENT_TYPE_LIST>({
      api: `${grievanceAPI.getAllDepartment}?page=${1}&limit=${1000}`,
      key: 'getAllDepartment',
      options: {
        enabled: true,
      },
    })
  

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
          <div>
            <RHFTextField name='problem' placeholder='Enter problem name' />
          </div>
          <div>
            <SelectField name='departmentId' data={
              department.data?.data?.docs?.map((item)=>{
                return {
                  value: item._id,
                  label: item.department,
                }
              }) ??[]
            }
            />
          </div>
          <div>
            <RHFTextField name='sla1' placeholder='Enter SLA 1' />
          </div>
          <div>
            <RHFTextField name='sla2' placeholder='Enter SLA 2' />
          </div>
          <div>
            <RHFTextField name='sla3' placeholder='Enter SLA 3' />
          </div>
          <Separator />
          <div>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className='h-11 w-full rounded-xl'
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  )
}
