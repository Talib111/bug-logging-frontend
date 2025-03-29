''
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  SelectField
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_WORK_FLOW_MASTER_TYPE_VIEW } from './type'
import { I_MODULE_TYPE_LIST } from '../moduleMaster/type'
import { I_ULB_TYPE_LIST } from '../ulbList/type'
import { useLocation } from 'react-router-dom'

const schema = yup.object().shape({
  ulbId: yup.string().notRequired(),
  moduleId: yup.string().notRequired(),
  // .required('Module  is required'),
  workFlowName: yup.string().required('workFlow Name is required'),
  parentId: yup.string().notRequired(),
  levelSerial: yup.string().notRequired(),
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

export default function ComplaintForm({
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

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  let parentId = query.get('parentId');
  let levelSerial = query.get('levelSerial');

  const getWorkFlowData = useApi<I_WORK_FLOW_MASTER_TYPE_VIEW>({
    api: `${grievanceAPI.getWorkFlowById}?id=${id}`,
    key: 'getWorkFlowById',
    options: {
      enabled: edit,
    },
  })

  const [checkPermissions, setCheckPermissions] = useState()
  const [checkUlbPermissions, setCheckUlbPermissions] = useState()

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    let lvl = parseInt(levelSerial!)
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateWorkFlow}/${id}`,
          data: {
            ulbId: data.ulbId,
            moduleId: data.moduleId,
            workFlowName: data.workFlowName,
            parentId: getWorkFlowData?.data?.data?.parentId,
            levelSerial: getWorkFlowData?.data?.data?.levelSerial,
          },
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Workflow not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createWorkFlow,
          data: {
            ulbId: data.ulbId,
            moduleId: data.moduleId,
            workFlowName: data.workFlowName,
            parentId: parentId,
            levelSerial: lvl,
          },
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Workflow not created successfully')
        }
        methods.reset({ ulbId: '', moduleId: '', workFlowName: '', parentId: "", levelSerial: "" })
      }
      setOpen(false)
      setEdit!(false)
      refetch!()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (edit && getWorkFlowData?.data) {
      methods.reset({
        ulbId: getWorkFlowData?.data?.data.ulbId,
        moduleId: getWorkFlowData?.data?.data.moduleId,
        workFlowName: getWorkFlowData?.data?.data.workFlowName,
        parentId: getWorkFlowData?.data.data?.parentId,
        levelSerial: getWorkFlowData?.data.data?.levelSerial,

      })
    } else {
      methods.reset({ ulbId: '', moduleId: "", workFlowName: '', parentId: parentId ?? '', levelSerial: levelSerial ?? '' })
    }
  }, [edit, getWorkFlowData?.data])


  const checkWorkflowModulePermissions = async () => {
    const res = await postMutation.mutateAsync({
      api: grievanceAPI.checkWfModulePermission,
      data: {
        // workflowId: parentId,
        workflowId: parentId == 'null' ? Number(parentId) : parentId,
        ulbId: parentId == 'null' ? Number(parentId) : parentId,
      },
    })
    if (res.data?.success) {
      setCheckPermissions(res.data?.canSelectModule)
      setCheckUlbPermissions(res.data?.canSelectUlb)
    } else {
      // toast.error('Workflow not created successfully')
    }
  }
  useEffect(() => {
    if (open === true) {
      checkWorkflowModulePermissions()
    }
  }, [open])

  const getModuleData = useApi<I_MODULE_TYPE_LIST>({
    api: `${grievanceAPI?.getAllModule}?page=1&limit=10000`,
    key: 'getAllModuleList',
    options: {
      enabled: true,
    },
  })
  const getUlbData = useApi<I_ULB_TYPE_LIST>({
    api: `${grievanceAPI?.getAllUlb}?page=1&limit=10000`,
    key: 'getAllUlb',
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
      isLoading={getWorkFlowData?.isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
          {
            checkUlbPermissions == true &&
            <div>Select ULB Name
              <SelectField name='ulbId' data={
                getUlbData.data?.data?.docs?.map((item) => {
                  return {
                    value: item._id,
                    label: item.ulbName,
                  }
                }) ?? []
              }
              />
            </div>
          }

          {
            checkPermissions == true &&
            <div>Select Module Name
              <SelectField name='moduleId' data={
                getModuleData.data?.data?.docs?.map((item) => {
                  return {
                    value: item._id,
                    label: item.moduleName,
                  }
                }) ?? []
              }
              />
            </div>
          }

          <div>
            <RHFTextField name='workFlowName' placeholder='Enter your WorkFlow Name' />
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
