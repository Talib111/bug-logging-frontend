import { Routes, Route, Navigate } from 'react-router-dom'
import {
  DashboardLayout,
  AuthLayout,
  MainLayout,
  CitizenLayout,
  CitizenDashboardLayout,
} from '@/layouts'
import { AuthGuard, GuestGuard } from '@/guard'
import NotFound from '@/pages/errors/not-found-error'
import routes from './allRoutes'
import { useAppContext } from '@/context'
import { useEffect, useState } from 'react'
import LoaderLine from '@/components/loaders/SuspenseLoader'

export default function AllRoutes() {
  const { user } = useAppContext()

  const [load, setLoad] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 2000)
  }, [])

  if (load) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <LoaderLine />
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path='/bug-log'
        element={<Navigate to='/bug-log/auth/login' />}
        index={true}
      />
      {/* <Route
        path='/bug-log'
        element={<Navigate to='/bug-log/main' />}
        index={true}
      /> */}

      {user?.role == 'Citizen user' && (
        <Route
          path='/bug-log'
          element={<Navigate to='/bug-log/citizen-dashboard/home' />}
          index={true}
        />
      )}
      {user?.role == 'State Admin' && (
        <Route
          path='/bug-log'
          element={<Navigate to='/bug-log/dashboard/analytics-dashboard' />}
          index={true}
        />
      )}
      {user?.role &&
        user?.role != 'State Admin' &&
        user?.role != 'Citizen user' && (
          <Route
            path='/bug-log'
            element={<Navigate to='/bug-log/dashboard/home' />}
            index={true}
          />
        )}
      <Route
        path='/bug-log/auth/login/transfer'
        element={<Navigate to='/bug-log/auth/login' />}
      />

      <Route path='/bug-log/main' element={<MainLayout />}>
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'main' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>
      <Route path='/bug-log/citizen' element={<CitizenLayout />}>
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'citizen' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/*************************************Auth Routes********************************************/}
      <Route
        path='/bug-log/auth'
        element={
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'auth' &&
            pages?.map(({ path, element, id }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/*************************************Dashboard Routes*******************************************/}
      <Route
        path='/bug-log/dashboard'
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'dashboard' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>
      {/* citizen dashboard */}
      <Route
        path='/bug-log/citizen-dashboard'
        element={
          <AuthGuard>
            <CitizenDashboardLayout />
          </AuthGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout == 'citizenDashboard' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/***************************************404 Routes****************************************************/}
      <Route path='*' element={<NotFound />} />
      {/* <Route path='/chatbot' element={<ChatBox status={true} />} /> */}
      <Route path='' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
