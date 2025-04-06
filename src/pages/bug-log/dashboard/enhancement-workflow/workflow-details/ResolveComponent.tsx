import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextArea,
  RHFUploadFiled,
} from '@/components/forms'
import { usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { CircleCheckBig, Info, X } from 'lucide-react'
import { Label } from '@/components/ui/label'

const schema = yup.object().shape({
  comment: yup.string().required('Write comment'),
  resolveDocs: yup.mixed().required('Please upload a document'),
})

interface ActionPermissions {
  refetch: () => void;
}

export default function ResolveComponent({
  setisDialogOpen,
  complaintData,
  actionPermissions,
}: {
  setisDialogOpen: (isOpen: boolean) => void;
  complaintData: any;
  actionPermissions: ActionPermissions;
}) {
  const mutate = usePutMutation({})
  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const [file, setFile] = useState<File | null>(null);

  // const [preview, setPreview] = useState(null)
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange =async (event:any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      methods.setValue('resolveDocs', selectedFile) // Update form state

      if (selectedFile.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
      } else {
        setPreview(null)
      }
    }
  }

  const onSubmit = async (data:any) => {
   

    const formData = new FormData()
    formData.append('complaintId', complaintData?.data?.data?._id)
    formData.append('comment', data.comment)
    formData.append('resolveDocs', data.resolveDocs)

    

    try {
      const result = await mutate.mutateAsync({
        api: grievanceAPI.resolveComplaint,
        data: formData,
      })
  
  if (result.data.success) {
    toast.success(result.data.message)
    actionPermissions.refetch()
    complaintData?.refetch()
    setisDialogOpen(false)
  } else {
    toast.error(result.data.message)
  }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className='gap-x-2 gap-y-4 px-10 py-10'>
        {/* Title Section */}
        <CardTitle className='mb-6 flex items-center justify-between text-2xl font-bold'>
          <div>
            <span className='mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white'>
              <CircleCheckBig className='inline' />
            </span>
            Resolve Bug
          </div>
          <div>
            <X
              className='inline cursor-pointer rounded-lg hover:bg-red-100'
              onClick={() => setisDialogOpen(false)}
            />
          </div>
        </CardTitle>

        {/* Info Label */}
        <Label className='flex items-center opacity-70'>
          <Info size={20} className='mr-1 inline' />
          <span>This comment will be visible to the citizen.</span>
        </Label>

        {/* File Upload */}
        <div className='mt-2'>
          <RHFUploadFiled
            className='cursor-pointer'
            accept='image/jpeg,image/jpg,image/png,application/pdf'
            name='resolveDocs'
            placeholder='Select document'
            onChange={handleFileChange}
          />
          {/* <label htmlFor="fileUpload" className="cursor-pointer bg-gray-200 p-2 rounded-md block text-center">
            Select Document
          </label> */}
        </div>

        {/* Preview Section */}
        {file && (
          <div className='mt-4 rounded-md border p-4 shadow-lg'>
            {file && <p className='font-semibold'>{file.name}</p>}

            {preview ? (
              <img
                src={preview}
                alt='Preview'
                className='mt-2 h-32 w-32 rounded-md object-cover'
              />
            ) : (
              <p className='text-gray-500'></p>
            )}
          </div>
        )}

        {/* Comment Text Area */}
        <RHFTextArea
          className='mt-2 h-40 w-full rounded-md border bg-background p-4'
          name='comment'
          placeholder='Comment'
        />

        {/* Submit Button */}
        <div className='mt-4'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className='w-full'
          >
            Resolve
          </ButtonLoading>
        </div>
      </div>
    </FormProviders>
  )
}
