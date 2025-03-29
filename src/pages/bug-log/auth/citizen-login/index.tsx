import LoginTitle from './LoginTitle';
import SingUpForm from './SingUpForm';
import { useAppContext } from "@/context";


export default function Login() {
      const { currentLanguage } :any= useAppContext();
  
  return (

    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/90 xl:mx-56 border shadow-lg mx-auto rounded-lg w-full max-w-6xl p-6 md:p-8 lg:p-12 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center pb-6 text-gray-800">
          {currentLanguage?.SIGN_UP_GRIEVANCE_REDRESSAL_SYSTEM}
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 w-full">

          {/* Left Side - SignUp Form */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-md">
              <SingUpForm />
            </div>
          </div>

          {/* Right Side - Login Title */}
          <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg p-6 shadow-inner sm:block hidden">
            <div className="w-full max-w-md text-center">
              <LoginTitle />
            </div>
          </div>

        </div>
      </div>
    </div>



  );
}
