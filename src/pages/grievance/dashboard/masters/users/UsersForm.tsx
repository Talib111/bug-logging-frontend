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
  RHFTextArea, SelectField,
  RHFUploadFiled
} from '@/components/forms'
import UserEditDialogBox from '@/components/user-edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_USERS_TYPE_VIEW } from './type'
import { I_ULB_TYPE_LIST } from '../ulbList/type'
import { useAppContext } from '@/context'
import { STATE_ADMIN, SUPER_ADMIN, ULB_ADMIN } from '@/../config/roles.config'


const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  mobile: yup.string().required().min(10).max(10).label('Mobile'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  roleId: yup.string().required('Role is required'),
  ulbId: yup.string(),
  address: yup.string(),
  imageUrl: yup.mixed().nullable(),
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

export default function UserForm({
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
  const { data, isFetching } = useApi<I_USERS_TYPE_VIEW>({
    api: `${grievanceAPI.getUserById}/${id}`,
    key: 'getUserById',
    options: {
      enabled: edit,
    },
  })

  const { user } = useAppContext()
  const methods = useForm<FormData>({
    defaultValues: { fullName: '', mobile: '', email: '', password: '', roleId: '', address: '' },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const formData = new FormData()
    // 1 if logged in user is ulb admin then send ulb of loggedin user
    // 2 if logged in user is state admin or superadmin then check if selected role is ulb admin then send ulb id otherwise don't send ulbid
    if (user?.roleId === ULB_ADMIN) {
      formData.append('ulbId', user?.userUlbId)
    }
    if ((user?.roleId === STATE_ADMIN || user?.roleId === SUPER_ADMIN) && data?.roleId === ULB_ADMIN) {
      formData.append('ulbId', data?.ulbId as string)
    }
    formData.append('fullName', data.fullName)
    formData.append('mobile', data.mobile)
    formData.append('roleId', data.roleId)
    formData.append('address', String(data?.address))
    formData.append('imageUrl', data.imageUrl as any)

    try {
      if (edit && data) {

        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateUser}/${id}`,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('User not updated successfully')
        }
      } else {
        formData.append('email', data.email)
        formData.append('password', data.password)
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createUser,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('User not created successfully')
        }
        methods.reset({
          fullName: '',
          mobile: '',
          email: '',
          password: '',
          roleId: '',
          address: ''
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
        fullName: data.userDetails.fullName,
        mobile: data.userDetails.mobile,
        email: data.userDetails.email,
        password: data.userDetails.password,
        roleId: data.userDetails.roleId,
        ulbId: data.userDetails.ulbId,
        address: data.userDetails.address,
        imageUrl: data.userDetails.imageUrl,
      })
    } else {
      methods.reset({ fullName: '', mobile: '', email: '', password: '', roleId: '', address: '' })
    }
  }, [edit, data])

  // const getRoleData = useApi<I_ROLE_TYPE_LIST>({
  //   api: `${grievanceAPI?.getAllRole}?page=1&limit=10000`,
  //   key: 'getAllRole',
  //   options: {
  //     enabled: true,
  //   },
  // })
  const getRoleData = useApi<any>({
    api: `${grievanceAPI?.getAllRoleByPermission}?page=1&limit=10000`,
    key: 'getAllRoleByPermission',
    options: {
      enabled: true,
    },
  })
  const ulbData = useApi<I_ULB_TYPE_LIST>({
    api: `${grievanceAPI.getAllUlb}?page=${1}&limit=${1000}`,
    key: 'getAllUlb',

    options: {
      enabled: true,
    },
  })

  return (
    <UserEditDialogBox
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
        <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
          <div>
            <RHFTextField name='fullName' placeholder='Enter your Full Name '
              inputValidation={['CapitalFirstLetter', 'removeDoubleSpace', 'string']}
            />
          </div>
          <div>
            <RHFTextField name='mobile' placeholder='Enter your Mobile no.'
              inputValidation={['mobile', 'number']}
            />
          </div>
          <div>
            <RHFTextField name='email' placeholder='Enter your Email'
              inputValidation={['removeSpace']}
            />
          </div>
          {!edit && <div>
            <RHFTextField name='password' placeholder='Enter your Password' />
          </div>}
          <div>
            <SelectField name='roleId' data={
              getRoleData.data?.data?.docs?.map((item: any) => {
                return {
                  value: item._id,
                  label: item.roleName,
                }
              }) ?? []
            }
              disabled={edit}
            />
          </div>
          {(user?.roleId === SUPER_ADMIN || user?.roleId === STATE_ADMIN) && methods.watch('roleId') === ULB_ADMIN
            &&
            <div>
              <SelectField name='ulbId' data={
                ulbData.data?.data?.docs?.map((item) => {
                  return {
                    value: item._id,
                    label: item.ulbName,
                  }
                }) ?? []
              }
                disabled={edit}
              />
            </div>
          }
          <div >
            <RHFUploadFiled name='imageUrl' placeholder='Upload your Images' />
          </div>
          <div>
            <RHFTextArea
              name='address'
              placeholder='Enter your Address'
              inputValidation={['removeDoubleSpace', 'UppercaseAfterSpace']}
            />
          </div>
          <div>
          </div>
        </div>
        <div className='mt-5 justify-center items-center flex'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className='h-11 w-full md:w-1/2 rounded-xl'
          >
            Submit
          </ButtonLoading>
        </div>
      </FormProviders>
    </UserEditDialogBox>
  )
}
