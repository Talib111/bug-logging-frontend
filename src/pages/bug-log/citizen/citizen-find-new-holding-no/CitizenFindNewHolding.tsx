''
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
} from '@/components/forms'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePostMutationJuidco } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import { CardTitle } from '@/components/ui/card'
import Spinner from '@/components/loaders/Spinner'

const schema = yup.object().shape({
  oldHoldingNo: yup.string().required('Old Holding No. is Required'),

})


export default function CitizenReviewForm() {
  const postMutation = usePostMutationJuidco({})

  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    try {

      const res = await postMutation.mutateAsync({
        api: `${grievanceAPI?.citizenFindNewHolding}`,
        data: {
          oldHoldingNo: data?.oldHoldingNo,
        }
      })
      if (res.data?.status) {
        toast.success(res?.data?.message)
      } else {
        toast.error(res?.data?.message)
      }
      methods.reset({
        oldHoldingNo: '',
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='md:px-24 space-y-4'>
          <CardTitle className='text-xl text-primary font-bold'>Find Your New Holding Number
          </CardTitle>
          <div className='sm:flex  items-center justify-start gap-4'>
            <div className='sm:w-1/2'>
              <Label htmlFor="oldHoldingNo">Holding Number</Label>
              <RHFTextField className='bg-background' name='oldHoldingNo' placeholder='Enter Your Old Holding Number' />
            </div>
            <div className='mt-7'>
              <ButtonLoading
                isLoading={methods.formState.isSubmitting}
                type='submit'
                className=' w-auto rounded-xl px-10 float-right'
              >
                Submit
              </ButtonLoading>
            </div>
          </div>
        </div>
      </FormProviders>
      {postMutation?.data?.data?.status &&
        <div className='sm:mt-5 mt-20 px-0 md:px-24'>
          <Card >
            <CardHeader className=''>
              <CardDescription>
                Holding Number List
              </CardDescription>
            </CardHeader>
            <CardContent>
              {postMutation.isPending ? (
                <div className='flex h-32 items-center justify-center'>
                  <Spinner />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>New Holding Number</TableHead>
                      <TableHead className=''>Citizen Name</TableHead>
                      <TableHead className=''>Mobile No.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow >
                      <TableCell>{postMutation?.data?.data?.data?.new_holding_no}</TableCell>
                      <TableCell>{postMutation?.data?.data?.data?.citizenName}</TableCell>
                      <TableCell>{postMutation?.data?.data?.data?.mobileNo}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      }
    </>
  )
}
