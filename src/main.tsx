import 'react-lazy-load-image-component/src/effects/blur.css'
import './index.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from 'react-error-boundary'
import { StateMachineProvider } from 'little-state-machine'
import ContextProviders from '@/context'
import { ThemeProvider } from '@/components/theme-provider'
import { littleMachineStore } from '@/lib/littleMachine.tsx'
import CustomErrorBoundary from './components/error-boundary/CustomErrorBoundary.tsx'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient()
const clientId = '791509906316-a7r7f18q5f0vvjtvm8o2qbdpdvtv7s1a.apps.googleusercontent.com';

const errorHandler = (error: Error, stackTrace: React.ErrorInfo) => {
  console.error(error, stackTrace)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    FallbackComponent={({ error }) => <CustomErrorBoundary error={error} />}
    onError={(error, stackTrace) => errorHandler(error, stackTrace)}
  >
    {/* @ts-ignore */}
    <StateMachineProvider createStore={littleMachineStore}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <GoogleOAuthProvider clientId={clientId}>
              {/* <SocketProvider> */}
              <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
                <ContextProviders>
                  <App />
                </ContextProviders>
              </ThemeProvider>
              {/* </SocketProvider> */}
            </GoogleOAuthProvider>
          </BrowserRouter>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </HelmetProvider>
    </StateMachineProvider>
  </ErrorBoundary>
)
