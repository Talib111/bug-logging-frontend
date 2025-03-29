''
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  SelectField,
  RHFTextArea,
} from '@/components/forms'
import { Label } from '@/components/ui/label'
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { CardTitle } from '@/components/ui/card'
import { CircleHelp } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import useGeoLocation from '@/hooks/useGeoLocation';
import { Link } from 'react-router-dom'




export default function UlbForm({ currentLanguage, setformStep, setcomplaintData, complaintData }: any) {

  const schema = yup.object().shape({
    ulb: yup.string().required(currentLanguage?.ULB_MANDAT_MSG),
  })

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      ulb: complaintData?.ulb,
      // ulbName:'',
      ulbName: complaintData?.ulbName,
      customAddress: ''
    }
  })

  const onSubmit = async (data: any) => {
    setcomplaintData({ ...complaintData, ulb: data.ulb, ulbName: data?.ulbName, customAddress: data?.customAddress || "" })
    setformStep(2)
  }

  const getUlbData = useApi<any>({
    api: `${grievanceAPI?.getAllUlbDirect}?page=1&limit=10000`,
    key: 'getAllUlbDirect',
    options: {
      enabled: true,
      refetchOnMount: false
    },
  })

  const { coords } = useGeoLocation();

  const locations = [
    { latitude: 23.3554337, longitude: 85.3606797, name: 'Location 1', radius: 50 },
    { latitude: 23.3544337, longitude: 85.3616797, name: 'Location 2', radius: 100 },
    { latitude: 23.3564337, longitude: 85.3626797, name: 'Location 3', radius: 75 },
  ];

  // Function to calculate the distance between two points (in meters) using the Haversine formula
  function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const earthRadius = 6378137; // Earth's radius in meters

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance; // distance in meters
  }

  // Function to find the matching location
  function findMatchingLocation(userCoords: any, locations: any) {
    if (!userCoords || !userCoords.latitude || !userCoords.longitude) {
      console.error('User coordinates are not available');
      return null;
    }

    for (let location of locations) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        userCoords.latitude,
        userCoords.longitude
      );

      if (distance <= location.radius) {
        return location;
      }
    }
    return null;
  }

  // Check if the user's location matches any of the locations in the array
  if (coords) {
    const matchingLocation = findMatchingLocation(coords, locations);

    if (matchingLocation) {
      console.log(`User is within the radius of ${matchingLocation.name}`);
    } else {
      console.log('User is out of location');
    }
  } else {
    console.log('Waiting for user location...');
  }



  return (
    <Popover>

      <PopoverContent className="w-80 border border-indigo-600">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              ULB
            </h4>
            <div className="flex  space-x-4">
              <div className="text-sm text-muted-foreground">
                ULB(Urban Local Body) is the nearest government body like Nagar Nigam, Nagar Panchayat, Nagar Parishad.
                <Link to={`/grievance/citizen/complaint-registration-info`} target='_blank'><span className='text-amber-600 underline cursor-pointer text-xs ml-2 italic font-serif'>Find my ULB</span></Link>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>


      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='gap-x-2 gap-y-4 px-10 py-10'>
          <div>
            <CardTitle className='text-2xl mb-10 flex items-center font-bold'><span className='text-red-500'>*</span>{currentLanguage?.SELECT_ULB}<PopoverTrigger asChild>
              <CircleHelp size={20} className="inline cursor-pointer ml-4" />
            </PopoverTrigger></CardTitle>

            <SelectField
              selectedText='ulbName'
              className='bg-background cursor-pointer' name='ulb' data={
                getUlbData.data?.data?.map((item: any) => {
                  return {
                    value: item._id,
                    label: item.ulbName,                    
                  }
                }) ?? []
              }
            />
          </div>
          {/* 66f3fde39448d983df5832d3 this id refers to (others) ulb  */}
          {methods.watch('ulb') == "66f3fde39448d983df5832d3" &&
            <div>
              <Label><span className='text-red-500'>*</span>Address</Label>
              <RHFTextArea
                className='bg-background w-full rounded-md p-4 h-20 border'
                name='customAddress'
                placeholder='Enter address of the complaint'
              />
            </div>
          }

          <div className='mt-4'>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className=' w-full'
            >
              {currentLanguage?.NEXT}
            </ButtonLoading>
          </div>

        </div>


      </FormProviders>
    </Popover>
  )
}
