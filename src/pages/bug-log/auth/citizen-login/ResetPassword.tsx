import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  ButtonLoading,
  FormProviders,
  RHFPasswordField,
} from '@/components/forms';
import { useLocation, useNavigate } from 'react-router-dom'
import { usePostMutation } from '@/hooks/useCustomQuery';
import { getErrorMessage, grievanceAPI } from '@/lib';


const schema = yup.object({

    id: yup.string(),
    token: yup.string(),
    password: yup
    .string()
    .required('Password is required'),
   confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required')
    .min(3, 'Password must be at least 3 characters'),
});

export default function ResetPassword() {

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const navigate = useNavigate()

  const id = query.get('id')
  const token = query.get('token')

  const sendOtpMutation = usePostMutation({});
  
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      id:"",
      token: "",
      password:"",
    
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    
    try {
      const response = await sendOtpMutation.mutateAsync({
        api: grievanceAPI.resetPassword,
        data: 
        {
          id: id,
          token: token,
          password: data.password,
        },
      });
     
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/bug-log/citizen-dashboard/home")
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      console.log("Error sending OTP", error);
      
    }
  };

  return (

      <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4 max-w-sm mx-auto border px-10 py-10 rounded-md">
          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="password"
              placeholder="Enter your new password"
            />
          </div>
          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="confirmPassword"
              placeholder="Enter your confirm password"
            />
          </div>
          <div>
            <ButtonLoading
              type="submit"
              isLoading={methods.formState.isSubmitting}
              className="w-full rounded-xl py-6 px-4 mt-2 shadow-none"
              variant="outline"
            >
              Forget Your Password
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
 
  );
}
