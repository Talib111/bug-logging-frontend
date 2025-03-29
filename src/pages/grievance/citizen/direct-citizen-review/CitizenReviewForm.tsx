import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextArea,
  RHFTextField
} from '@/components/forms'
import { usePostMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import { CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/context'


const schema = yup.object().shape({
  citizenName: yup.string().required('Citizen Name is required'),
  feedback: yup.string().required('Feedback is required'),
})


export default function CitizenReviewForm(props:any) {
  const postMutation = usePostMutation({})
  const { user } = useAppContext()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0);
  const methods = useForm<any>({
    defaultValues: {
      citizenName: user?.fullName ?? '',
      citizenRating: '',
      feedback: '',
      role: user?.role ?? '',
      imageUrl:user?.imageUrl??''
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    try {
      const res = await postMutation.mutateAsync({
        api: grievanceAPI.createCitizenFeedback,
        data: {
          citizenName: data.citizenName,
          citizenRating: rating,
          feedback: data.feedback,
          imageUrl: user?.imageUrl,
          role: user?.role
        },
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate(`/grievance/citizen/citizen-testimonials`)
      } else {
        toast.error('Feedback not created successfully')
      }
      methods.reset({
        ulbId: '',
        moduleId: '',
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleRating = (index: any) => {
    setRating(index);
  };

useEffect(()=>{
  props?.setUserImage(user?.imageUrl)
},[])


  return (
    <FormProviders
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className='md:px-24 space-y-4'>
        <CardTitle className='text-xl text-primary font-bold'>Rate Us</CardTitle>
        <div className='flex space-x-4'>
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => handleRating(index + 1)}>
              <Star
                size={30}
                className={`inline cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            </span>
          ))}
        </div>
        <div>
          <Label htmlFor="citizenName">Write Your Name</Label>
          <RHFTextField
            className='bg-background w-full rounded-md p-4  border'
            name='citizenName'
            placeholder='Enter your Name'
          />
        </div>
        <div>
          <Label htmlFor="complaintTitle">Feedback</Label>
          <RHFTextArea
            className='bg-background w-full rounded-md p-4 h-40 border'
            name='feedback'
            placeholder='Enter your feedback'
          />
        </div>
        <div className='col-span-3'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className=' w-auto rounded-xl px-10 float-right'
          >
            Submit
          </ButtonLoading>
        </div>
      </div>
    </FormProviders>
  )
}
