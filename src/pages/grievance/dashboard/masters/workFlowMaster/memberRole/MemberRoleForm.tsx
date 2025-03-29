''
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
 SelectField
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_COMPLAINT_TYPE_VIEW } from '../../complaint/type'
import { I_WORK_FLOW_ROLE_TYPE_LIST } from '../../workFlowRole/type'

const schema = yup.object().shape({
  roleName: yup.string().required('Role Name is required'),
  
})
type FormData = yup.InferType<typeof schema>

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  id?: string
  wrkId?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

export default function MemberRoleForm({
  open,
  setOpen,
  title,
  id,
  wrkId,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const putMutation = usePutMutation({})
  const { data } = useApi<I_COMPLAINT_TYPE_VIEW>({
    api: `${grievanceAPI.getWFUserMappingById}/${wrkId}`,
    key: 'getWFUserMappingById',
    options: {
      enabled: edit,
    },
  })
  const methods = useForm<FormData>({
    defaultValues: { roleName: data?.data?._id ||''},
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateWFUserAndMemberMapping}/${id}`,
          data: {
            workflowUserMappingId: id,
            workflowRoleId: data?.roleName,
          },
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Member Role not updated successfully')
        }
      setOpen(false)
      setEdit!(false)
      refetch!()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (edit ) {
      methods.reset({
        roleName: data?.data?._id,
        
      })
    } else {
      methods.reset({ roleName: ''})
    }
  }, [edit, data])

  const workFlowRoleData = useApi<I_WORK_FLOW_ROLE_TYPE_LIST>({
    api: `${grievanceAPI.getAllWorkFlowRole}?page=${"1"}&limit=${"1000"}`,
    key: 'getAllWorkFlowRole',
   
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
      // isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
          
          <div>
            <SelectField name='roleName' data={
              workFlowRoleData.data?.data?.docs?.map((item)=>{
                return {
                  value: item._id,
                  label: item.workFlowRoleName,
                }
              }) ??[]
            }
            />
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
