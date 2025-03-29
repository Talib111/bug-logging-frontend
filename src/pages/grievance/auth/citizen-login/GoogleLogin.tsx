import { useGoogleLogin } from '@react-oauth/google';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi } from '@/lib';
import toast from 'react-hot-toast';
import { useAppContext } from '@/context';

export default function GoogleLogin() {
  const { currentLanguage } :any= useAppContext();

    const { login } = useAppContext();
    const mutate = usePostMutation({});
    const googleAuth = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const result = await mutate.mutateAsync({
                api: authApi.googleAuth,
                data: { access_token: tokenResponse.access_token }
            })
            if (result?.data?.success) {
                await login(result);
                toast.success(result?.data?.message || 'Successfully logged in');
                
            } else {
                console.log(result?.data?.message);
            }
        },
        onError: error => console.log(error)
    });
    return (
            <div
                onClick={() => googleAuth()}
                className="flex cursor-pointer  text-md font-medium text-white bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                <img
                    src="https://i.ibb.co/Vx7bDRg/google-img-prev-ui.png"
                    alt="Google Logo"
                    className="w-10 h-10 mx-2"
                />
                <span className=" border  px-2 w-full justify-center bg-[#4285F4] flex items-center text-white ">{currentLanguage?.SIGN_IN_WITH_GOOGLE}</span>
            </div>
    )
}
