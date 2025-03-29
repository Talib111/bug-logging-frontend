import { Navigate } from 'react-router-dom';
import { useAppContext } from '@/context';
import LoaderLine from '@/components/loaders/SuspenseLoader'
import {getRedirect} from '@/lib'
// ----------------------------------------------------------------------

export default function GuestGuard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ctxValue = useAppContext();

  if (!ctxValue?.isInitialized) {
    return <LoaderLine />
  }

  if (ctxValue?.isAuthenticated) {
    return <Navigate to={getRedirect(ctxValue?.user?.role!) as string} replace />;
  }

  return <>{children}</>;
}

