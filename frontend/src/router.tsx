import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import SignIn from "./pages/auth/Signin";

export const router = createBrowserRouter([
    {path:'/sign-up', element:<Signup/>},
    {path:'/sign-in', element:<SignIn/>},
])