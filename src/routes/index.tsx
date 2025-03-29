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
import ChatBox from '../components/chatbox/index.tsx'
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
        path='/grievance'
        element={<Navigate to='/grievance/main' />}
        index={true}
      />
      {/* <Route
        path='/grievance'
        element={<Navigate to='/grievance/main' />}
        index={true}
      /> */}

      {user?.role == 'Citizen user' && (
        <Route
          path='/grievance'
          element={<Navigate to='/grievance/citizen-dashboard/home' />}
          index={true}
        />
      )}
      {user?.role == 'State Admin' && (
        <Route
          path='/grievance'
          element={<Navigate to='/grievance/dashboard/analytics-dashboard' />}
          index={true}
        />
      )}
      {user?.role &&
        user?.role != 'State Admin' &&
        user?.role != 'Citizen user' && (
          <Route
            path='/grievance'
            element={<Navigate to='/grievance/dashboard/home' />}
            index={true}
          />
        )}
      <Route
        path='/grievance/auth/login/transfer'
        element={<Navigate to='/grievance/auth/login' />}
      />

      <Route path='/grievance/main' element={<MainLayout />}>
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'main' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>
      <Route path='/grievance/citizen' element={<CitizenLayout />}>
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
        path='/grievance/auth'
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
        path='/grievance/dashboard'
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
        path='/grievance/citizen-dashboard'
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
