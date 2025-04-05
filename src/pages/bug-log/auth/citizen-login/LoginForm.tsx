import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import LoginTitle from './LoginTitle';

import { yupResolver } from '@hookform/resolvers/yup';
import EditDialogBox from '@/components/edit-dialog-box'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFPasswordField
} from '@/components/forms';
import { useAppContext } from '@/context';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage, grievanceAPI } from '@/lib';
import GoogleLogin from './GoogleLogin';
import { useState } from 'react';

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().min(3)
});

export default function LoginForm() {
  const { currentLanguage } :any= useAppContext();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(false)
  const [otp, setOtp] = useState(''); // OTP input state
  const postLogin = usePostMutation({});
  const forgetPasswordMutation = usePostMutation({});
  const { login } = useAppContext();
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });
  // console.log(closeModal);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.citizenLogin,
        data: data
      });
      if (response?.data?.success) {
        await login(response);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  const forgetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await forgetPasswordMutation.mutateAsync({
        api: grievanceAPI.forgetPassword,
        data: { email: otp },
      });
      if (response?.data?.success) {
        setOpen(false)
        // navigate("/bug-log/auth/citizen-reset-password")
        toast.success(response?.data?.message);
        setIsLoading(false);
      } else {
        // toast.error('Invalid OTP.');
        toast.error(response?.data?.message);
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
        title="Reset Your Password"
        setEdit={setCloseModal}
      >
        <div className="p-4">
          {/* <h2 className="text-lg font-semibold mb-4 text-center">Reset Your Password</h2> */}
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Your email address"
              className="input-field w-full border border-gray-300 rounded-md p-1.5"
            />
            <div>
              <ButtonLoading
                type="button"
                onClick={forgetPassword}
                disabled={isLoading}
                className="w-full rounded-xl py-5 px-4 mt-4 shadow-none"
                variant="outline"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </ButtonLoading>
            </div>
          </form>
        </div>
      </EditDialogBox>
      <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-6 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">

          {/* Left Section: Form */}
          <div className="flex-1 p-10">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
             {}
            </h2>

            <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="space-y-4 max-w-md mx-auto">

                {/* Email Input Field */}
                <div className="space-y-2">
                  <RHFTextField
                    className="rounded-lg py-5 px-5 w-full bg-gray-100 border border-gray-300"
                    name="email"
                    inputValidation={['removeSpace']}
                    placeholder="Enter your Email !"
                  />
                </div>

                {/* Password Input Field */}
                <div className="space-y-2">
                  <RHFPasswordField
                    className="rounded-lg py-5 px-5 w-full bg-gray-100 border border-gray-300"
                    name="password"
                    placeholder="Enter your Password"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <ButtonLoading
                    type="submit"
                    isLoading={methods.formState.isSubmitting}
                    className="w-full rounded-lg py-5 px-4 mt-2 bg-green-600 text-white font-medium hover:bg-green-700 transition duration-200"
                    variant="outline"
                  >
                    Login
                  </ButtonLoading>
                </div>

                {/* Or Divider */}
                <div className="flex items-center gap-2">
                  <hr className="flex-1 border-gray-300" />
                  <span className="text-gray-500">or</span>
                  <hr className="flex-1 border-gray-300" />
                </div>

                {/* Google Login Button */}
                <div>
                  <GoogleLogin />
                </div>

                {/* ePramaan Login */}
                <div>
                  <Link to="https://epramaan.meripehchaan.gov.in/">
                    <div className="flex cursor-pointer text-md font-medium text-white bg-green-600  py-1.5 justify-center hover:bg-green-700 transition duration-200">
                      Sign in with ePramaan
                    </div>
                  </Link>
                </div>

                {/* Forgot Password */}
                <div className="text-center mt-4">
                  {/* <Link to="/auth/forgot-password"> */}
                  <button className="text-sm text-blue-600 hover:underline " type='button' onClick={() => setOpen(true)}>Forgot password?</button>
                  {/* </Link> */}
                </div>
              </div>
            </FormProviders>
          </div>

          {/* Right Section: Placeholder for Login Title or an Image */}
          <div className="flex-1 bg-gradient-to-b from-gray-200 to-gray-300 flex justify-center items-center lg:block hidden">
            <LoginTitle />
          </div>
        </div>
      </div>
    </>





  );
}
