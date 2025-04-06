import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '@/context'
import LoaderLine from '@/components/loaders/SuspenseLoader'
// import routes from '@/routes/allRoutes';

export default function AuthGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isInitialized, isAuthenticated } = useAppContext()
  const { pathname } = useLocation()
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  )

  // const isAccessRoute = () => {
  //   const filterPath = pathname.split('/').filter((path) => path !== '');
  //   const route = routes
  //     .map((route) => route.pages.map((page) => page))
  //     .flat(1);
  //   const getAccessPath = route
  //     .filter((path) => path.path.split('/')[0] == filterPath[1])
  //     ?.map((path) => path.userTypes?.includes(`${user?.userTypeId}`))[0];

  //   return getAccessPath;
  // };

  if (!isInitialized) {
    return <LoaderLine />
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Navigate to='/bug-log/auth/login' />
  }

  // if (isAuthenticated && !isAccessRoute()) {
  //   return (
  //     <div className="flex flex-col h-screen">
  //       <div className="flex flex-col flex-1 items-center justify-center">
  //         <div className="flex flex-col items-center">
  //           <h1 className="text-lg font-bold text-gray-600">
  //             403
  //             <span className="text-lg font-medium text-gray-400"> | </span>
  //             Unauthorized
  //           </h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <>{children}</>
}
