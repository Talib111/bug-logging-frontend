// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import { googleLogout } from '@react-oauth/google';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Confirm } from '@/components/confirm-box';
import { useAppContext } from '@/context'
export function UserNav() {
  const { currentLanguage } :any= useAppContext();

  const { user } = useAppContext()
  const { logout } = useAppContext()
  const Logout = () => {

    Confirm( "Are You Sure ?", 'Please confirm', async () => {
      googleLogout();
      logout();
    });

  }

  
console.log(user)
console.log(user?.email)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-10 w-10'>
            {/* <AvatarImage src={user?.googleId ? user?.imageUrl : user?.imgFullPath} alt='profile' /> */}
            <AvatarImage src={'/images/dummy-user.png'} alt='profile' />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.fullName}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <Link to={'#'}>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link> */}
          {/* <DropdownMenuItem>
            Notifications
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        {typeof window !== 'undefined' && !window.ReactNativeWebView && (
          <DropdownMenuItem onClick={() => Logout()}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
