import React from 'react'
// import Signup from './pages/auth/Signup'
import { RouterProvider } from 'react-router-dom'
import {router} from './router'

const App:React.FC = () => {
  return (
    <div>
      {/* <Signup/> */}
      <RouterProvider router={router}/>
    </div>
  )
}

export default App