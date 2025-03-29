import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EditDialogBox from '@/components/edit-dialog-box';
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFPasswordField,
} from '@/components/forms';
import { useNavigate } from 'react-router-dom'
import { usePostMutation } from '@/hooks/useCustomQuery';
import { getErrorMessage, grievanceAPI } from '@/lib';
import GoogleLogin from './GoogleLogin';
import { useState } from 'react';
import { useAppContext } from "@/context";


const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email'),
  password: yup.string().min(3)
  .required('Password is required'),
  roleId: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
    .min(3, 'Password must be at least 3 characters'),
});

export default function LoginForm() {
  const { currentLanguage } :any= useAppContext();

  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [closeModal, setCloseModal] = useState(false)
  const [otp, setOtp] = useState(''); // OTP input state
  const sendOtpMutation = usePostMutation({});
  const verifyOtpMutation = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: '',
      roleId: '66d2a49adcdbb5c654b983cc',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
console.log(closeModal);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    
    try {
      const response = await sendOtpMutation.mutateAsync({
        api: grievanceAPI.  citizenRegistration,
        data:{
          email: data.email,
          roleId: data.roleId,
          password: data.password,
        },
      });
     
      if (response?.data?.success) {
        setOpen(true);
        toast.success('OTP sent to your email.');
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      console.log("Error sending OTP", error);
      
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await verifyOtpMutation.mutateAsync({
        api: grievanceAPI.verifyOtp,
        data: { otp, email: methods.getValues('email') },
      });

      if (response?.data?.success) {
        navigate("/bug-log/citizen-dashboard/home")
        toast.success('Sing Up successful!');
       
      } else {
        toast.error('Invalid OTP.');
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  return (
    <>
      <EditDialogBox
        open={open}
        setOpen={setOpen}
        title="OTP Verification"
        setEdit={setCloseModal}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="input-field w-full border border-gray-300 rounded-md p-2"
            />
            <div>
              <ButtonLoading
                type="button"
                onClick={verifyOtp}
                // isLoading={verifyOtpMutation.isLoading}
                className="w-full rounded-xl py-6 px-4 mt-2 shadow-none"
                variant="outline"
              >
                Verify OTP
              </ButtonLoading>
            </div>
          </form>
        </div>
      </EditDialogBox>

      <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4 max-w-sm mx-auto">
          <div className="space-y-2">
            <RHFTextField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="email"
              inputValidation={['removeSpace']}
              placeholder={currentLanguage?.ENTER_YOUR_EMAIL}
            />
          </div>
          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="password"
              placeholder={currentLanguage?.ENTER_YOUR_PASSWORD}
            />
          </div>
          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="confirmPassword"
              placeholder={currentLanguage?.ENTER_YOUR_CONFIRM_PASSWORD}
            />
          </div>
          <div>
            <ButtonLoading
              type="submit"
              isLoading={methods.formState.isSubmitting}
              className="w-full rounded-xl py-6 px-4 mt-2 shadow-none"
              variant="outline"
            >
              {currentLanguage?.SU}
            </ButtonLoading>
          </div>

          <div className="flex items-center gap-2">
            <hr className="flex-1" />
            <span>or</span>
            <hr className="flex-1" />
          </div>
          <div>
            <GoogleLogin />
          </div>
          <div>
            <Link to="https://epramaan.meripehchaan.gov.in/">
              <div className="flex cursor-pointer text-lg font-medium text-white bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <span className="border px-2 w-full justify-center bg-[rgb(38,204,204)] flex items-center text-white py-1.5">
                  {currentLanguage?.SIGN_UP_WITH_EPRAMAAN}
                </span>
              </div>
            </Link>
          </div>
          <div className="text-center  flex justify-center">
            <Link to="/bug-log/auth/citizen-login">
              <span className="text-base flex">{currentLanguage?.ALREADY_HAVE_ACCOUNT_LOGIN}   <p className='text-blue-800 ml-1  text-base'> Login</p></span>
            </Link>
          </div>
        </div>
      </FormProviders>
    </>
  );
}
