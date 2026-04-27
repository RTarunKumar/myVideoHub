import React from 'react'
// import Signup from './pages/auth/Signup'
import { RouterProvider } from 'react-router-dom'
import {router} from './router'
import { Provider } from 'react-redux'
import { store } from './reducers/auth/store'
import { Toaster } from 'sonner'

const App:React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <Toaster position='top-right' richColors closeButton/>
        <RouterProvider router={router}/>
      </Provider>
      {/* <Signup/> */}
    </div>
  )
}

export default App