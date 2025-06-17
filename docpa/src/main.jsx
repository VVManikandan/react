import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'
import Home from './Home.jsx'
import Doctordetails from './Doctordetails.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
 {
  path :'/',
  element : <Home/>,
  errorElement :'oops something went wrong'
 },
 {
  path :'/login',
  element :<Login/>
 },
 {
  path:'/Doctordetails/:id',
  element:<Doctordetails/>
 }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
