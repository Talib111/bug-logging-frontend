import { Button } from '../ui/button'

export default function CustomErrorBoundary({
  error,
}: Readonly<{ error: Error }>) {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='space-y-2 px-6 text-center'>
        <h1 className='text-xl font-bold text-red-500'>Error</h1>
        <p className='text-sm font-semibold text-gray-500'>{error.message}</p>
        <Button
          onClick={() => window.location.reload()}
          variant='destructive'
          size='sm'
        >
          Reload
        </Button>
      </div>
    </div>
  )
}
