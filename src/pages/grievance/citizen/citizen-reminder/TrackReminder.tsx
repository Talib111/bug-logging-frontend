import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import EditDialogBox from '@/components/edit-dialog-box';
import { usePostMutation } from '@/hooks/useCustomQuery';
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
import { useGetMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import { CardTitle } from '@/components/ui/card'
import Spinner from '@/components/loaders/Spinner'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { useAppContext } from '@/context'

const schema = yup.object().shape({
  complaintNo: yup.string().required('Complaint No. is Required'),
})

export default function CitizenReviewForm() {
  const sendOtpMutation = usePostMutation({});
  const verifyOtpMutation = usePostMutation({});
  const postMutation = useGetMutation();

  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false)
  const [showList, setShowList] = useState(true);
  const [otp, setOtp] = useState('');
  const {currentLanguage}:any = useAppContext()

  const methods = useForm<any>({
    resolver: yupResolver(schema),
  });

  console.log(closeModal);

  const onSubmit = async (data: any) => {
    try {
      const res = await postMutation.mutateAsync({
        api: `${grievanceAPI.getComplaintDetailsByComplaintNo}/${data?.complaintNo}`,
      });

      if (res.data?.success) {
        toast.success(res?.data?.message);
        // handleEmailSubmit(res)
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailSubmit = async (res: any) => {
    try {
      const response = await sendOtpMutation.mutateAsync({
        api: grievanceAPI.sendOtp,
        data: { email: res?.data?.data?.email },
      });

      if (response?.data?.success) {
        toast.success('OTP sent to your email');
        setOpenOtpModal(true);
      } else {
        toast.error('Error sending OTP');
      }
    } catch (error) {
      // toast.error(getErrorMessage(error.message));
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    try {
      const response = await verifyOtpMutation.mutateAsync({
        api: grievanceAPI.verifyEmailOtp,
        data: { otp, email: postMutation?.data?.data?.data?.email },
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOpenOtpModal(false);
        setShowList(true);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  return (
    <>

      {/* OTP Verification Modal */}
      <EditDialogBox open={openOtpModal} setOpen={setOpenOtpModal} title="OTP Send to your Registered Email" setEdit={setCloseModal}>
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="input-field w-full border border-gray-300 rounded-md p-2"
            />
            <div>
              <ButtonLoading
                type="button"
                onClick={verifyOtp}
                className="w-full rounded-xl py-6 px-4 mt-2 shadow-none"
                variant="outline"
              >
                Verify OTP
              </ButtonLoading>
            </div>
          </form>
        </div>
      </EditDialogBox>

      {/* Form for Tracking Complaint */}
      <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

        <div className="md:px-24 space-y-4">
          <CardTitle className="text-xl text-primary font-bold">{currentLanguage?.SEND_REM} </CardTitle>

          <div className='flex gap-4'>
            <div className='md:w-4/12'>
              <Label htmlFor="complaintNo">{currentLanguage?.GN
                }</Label>
              <RHFTextField className="bg-background" name="complaintNo" placeholder="" />
            </div>
            <div className="col-span-3 mt-7">
              <ButtonLoading
                isLoading={methods.formState.isSubmitting}
                type="submit"
                className="w-auto rounded-xl px-10 float-right"
              >
                {currentLanguage?.SUBMIT}
              </ButtonLoading>
            </div>
          </div>


        </div>
      </FormProviders>

      {/* Display Complaint Details */}
      {postMutation?.data?.data?.success && showList && (
        <div className="mt-20 md:px-24">
          <Card>
            <CardHeader className="px-7">
              <CardDescription>{currentLanguage?.GL}</CardDescription>
            </CardHeader>
            <CardContent>
              {postMutation.isPending ? (
                <div className="flex h-32 items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{currentLanguage?.GRIEVANCE_NO}.</TableHead>
                      <TableHead>{currentLanguage?.CITIZEN_NAME}</TableHead>
                      <TableHead>{currentLanguage?.MOBILE_NO}.</TableHead>
                      <TableHead>{currentLanguage?.STATUS}</TableHead>
                      <TableHead>{currentLanguage?.VIEW}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{postMutation?.data?.data?.data?.complaintRefNo}</TableCell>
                      <TableCell>{postMutation?.data?.data?.data?.citizenName}</TableCell>
                      <TableCell>{postMutation?.data?.data?.data?.mobileNo}</TableCell>
                      <TableCell>
                        {postMutation?.data?.data?.data?.wf_status === 3 && (
                          <Badge className="bg-amber-400 text-white">{currentLanguage?.PR}</Badge>
                        )}
                        {postMutation?.data?.data?.data?.wf_status === 2 && (
                          <Badge variant="destructive">{currentLanguage?.R}</Badge>
                        )}
                        {postMutation?.data?.data?.data?.wf_status === 1 && (
                          <Badge variant="success">{currentLanguage?.RS} </Badge>
                        )}
                        {postMutation?.data?.data?.data?.wf_status === 0 && (
                          <Badge variant="secondary">{currentLanguage?.P}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/grievance/citizen/complaint-details?complaintRefNo=${postMutation?.data?.data?.data?.complaintRefNo}&complaintId=${postMutation?.data?.data?.data?._id}`}
                        >
                          <Button className="bg-primary">{currentLanguage?.VIEW}</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
