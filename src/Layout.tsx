

import { Outlet } from 'react-router'
import { Toaster } from "sonner"
function Layout() {


  return (
    <>


        
    <Outlet key={location.pathname}/>
    <Toaster theme="dark" position="top-right" />
   
      
    </>
  )
}

export default Layout