// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
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
import { useState } from 'react';
const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().min(3)
});

export default function LoginForm() {
  // const navigate = useNavigate()
  const postLogin = usePostMutation({});
  const forgetPasswordMutation = usePostMutation({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(false)
  const [otp, setOtp] = useState(''); // OTP input state
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
    console.log('data', data);
    try {
      // const response = await axios.post(authApi.login, data);
      // console.log("response",response)

      const response = await postLogin.mutateAsync({
        api: authApi.login,
        data: data
      });
      // console.log("response",response?.data)
      // if (response?.data?.status) {
        if (response?.data?.success) {
        // localStorage.setItem('token',response?.data?.data?.token)
        await login(response);
       
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <header className=" h-[7vh] w-full border-b border-gray-200 bg-white darks:bg-gray-800 darks:border-gray-800">
        <div className="container mx-auto xl:max-w-6xl ">
          <nav className=" " id="desktop-menu">
            <a className="" href="">
              <div className='mt-6'> <span className="font-bold text-xl uppercase">
                Login - Grievance Management System
              </span></div>
            </a>
          </nav>
        </div>
      </header>
      <main className='h-[80vh] bg-gray-100 flex justify-center items-center'>
        <div className=" bg-gray-100 darks:bg-gray-900 darks:bg-opacity-40">
          <div className="container mx-auto px-4 xl:max-w-6xl ">
            <div className="flex flex-wrap -mx-4 flex-row ">
              <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2 ">
                <div className="max-w-full w-full px-2 sm:px-12 lg:pr-20 mb-12 lg:mb-0  ">
                  <div className="relative">
                    <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white darks:bg-gray-800 shadow-xl">
                      <div className="text-center space-y-3">
                        <h1 className="text-2xl leading-normal  font-bold text-gray-800 darks:text-gray-300 text-center mb-">Welcome Back</h1>
                        <div className='flex justify-center items-center '>
                          <div className='border-b w-10 border border-black mb-7'></div>
                        </div>
                      </div>
                      <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <RHFTextField
                              className=" py-5 px-5 w-full bg-background"
                              name="email"
                              inputValidation={['removeSpace']}
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="space-y-2">
                            <RHFPasswordField
                              className="py-5 px-5 w-full bg-background"
                              name="password"
                              placeholder="Enter your password"
                            />
                          </div>
                          <div>
                            <ButtonLoading
                              type="submit"
                              isLoading={methods.formState.isSubmitting}
                              className="w-full  py-5 px-4 mt-2 shadow-none"
                            >
                              <svg xmlnsXlink="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-4 h-4 mr-1 ltr:mr-2 rtl:ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                              </svg>
                              Login
                            </ButtonLoading>
                          </div>
                          <div className="flex items-center gap-2">
                            <hr className="flex-1" />
                            <span>or</span>
                            <hr className="flex-1" />
                          </div>
                          <div className="text-center">
                            <button className="text-sm text-primary" type='button' onClick={() => setOpen(true)}>Forgot password?</button>
                          </div>
                        </div>
                      </FormProviders>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                <div className="text-center mt-6 lg:mt-0">
                  {/* <img src={sideLogo} alt="welcome" className="h-68 " /> */}
                  <img src='/images/mob.png' alt="welcome" className="h-68 rounded-lg" />
                  <div className="px-4 mt-4">
                    <h1 className="font-semibold text-2xl">Manage Grievance with Ease of Access</h1>
                    <p className="text-base mb-4 text-gray-500">Easily manage greivance applications with simplified workflows.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className=" h-[10vh] w-full bg-white py-6 border-t border-gray-200 darks:bg-gray-800 darks:border-gray-800">
        <div className="container mx-auto px-4 xl:max-w-6xl w-full">
          <div className="mx-auto px-4">
            <div className="flex flex-wrap flex-row -mx-4">
              <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-left md:rtl:text-right">
                <ul className="ltr:pl-0 rtl:pr-0 space-x-4">
                  <li className="inline-block ltr:mr-3 rtl:ml-3">
                    <a className="hover:text-indigo-500" href="#">Support |</a>
                  </li>
                  <li className="inline-block ltr:mr-3 rtl:ml-3">
                    <a className="hover:text-indigo-500" href="#">Help Center |</a>
                  </li>
                  <li className="inline-block ltr:mr-3 rtl:ml-3">
                    <a className="hover:text-indigo-500" href="#">Privacy |</a>
                  </li>
                  <li className="inline-block ltr:mr-3 rtl:ml-3">
                    <a className="hover:text-indigo-500" href="#">Terms of Service</a>
                  </li>
                </ul>
              </div>
              <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-right md:rtl:text-left">
                <p className="mb-0 mt-3 md:mt-0">
                  <a href="#" className="hover:text-indigo-500">
                    UD&HD
                  </a> | All right reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
