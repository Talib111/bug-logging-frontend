import TopBar from '@/components/top-bar'
import { Outlet } from 'react-router-dom'
import Footer from "@/components/footer";

export default function () {
  return (
    <div>
      <TopBar />
          <Outlet />
      <Footer />
    </div>
  )
}
