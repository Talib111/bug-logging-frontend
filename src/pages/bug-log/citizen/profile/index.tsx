import { useAppContext } from '@/context';
import Profile from './Profile'
import Page from '@/components/helmet-page';

export default function Home() {
    const { currentLanguage } :any= useAppContext();
  


  return (
    <Page title="Profile Information">
    <Profile />
  </Page>
  
  )
}
