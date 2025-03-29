import { useAppContext } from '@/context'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card';
import { Image } from '@/components/image';
import { Badge } from '@/components/ui/badge';
export default function Profile() {
  const { currentLanguage } :any= useAppContext();


  const { user } = useAppContext()
 


  return(
     <main className="items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 ">
      {/* <CardTitle className="text-xl col-span-2">
        Profile Information
      </CardTitle> */}
      <Card className="relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 w-full mt-10 py-10" x-chunk="dashboard-05-chunk-4">
      {user?.status ===1 && <Badge className='absolute top-2 left-2 px-4' variant={'success'}>Active</Badge>}
      {user?.status !==1 && <Badge className='absolute top-2 left-2 px-4' variant={'default'}>In-Active</Badge>}

        <div className='flex justify-center items-center'>
          <CardContent>
            <div className="flex justify-center">
              <Image
                // src={user?.imgFullPath}
                // src={user?.imageUrl}
                src={user?.googleId ? user?.imageUrl : user?.imgFullPath}
                width={200}
                height={200}
                alt="Avatar"
                className="overflow-hidden rounded-full w-40 border bg-gray-200"
              />
            </div>

            <CardTitle className="text-2xl text-center">
             {user?.fullName}
            </CardTitle>
            <CardDescription className="text-center">
             {user?.role}
            </CardDescription>
          </CardContent>
        </div>

        <div>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <CardTitle className="text-2xl">
                My Details
              </CardTitle>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground flex-initial text-base">Name : &nbsp;</dt>
                    <dd className='flex-1 text-muted-foreground font-semibold'>{user?.fullName}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground flex-initial text-base">Phone No. : &nbsp;</dt>
                    <dd className='flex-1 text-muted-foreground font-semibold'>{user?.mobile}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground flex-initial text-base">Alt. Phone No. : &nbsp;</dt>
                    <dd className='flex-1 text-muted-foreground font-semibold'>{user?.mobile}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground flex-initial text-base">Email :&nbsp;</dt>
                    <dd className='flex-1 text-muted-foreground font-semibold'>{user?.email}</dd>
                  </div>
                  <div className="flex items-start justify-between">
                    <dt className="text-muted-foreground flex-initial text-base">State : &nbsp;</dt>
                    <dd className='flex-1 text-muted-foreground font-semibold mt-1'>Jharkhand</dd>
                  </div>
                 
              </dl>
            </div>
          </CardContent>
        </div>
      </Card>
    </main>
  )
  
}
