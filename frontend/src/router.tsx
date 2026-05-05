import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import SignIn from "./pages/auth/Signin";
import UserProfile from "./pages/user/UserProfile";
import { ProtectedRoute, ProtectedRouteHome } from "./Components/ProtectedRoute";

export const router = createBrowserRouter([
    {path:'/sign-up', element:<ProtectedRoute element={<Signup/>}/>},
    {path:'/sign-in', element:<ProtectedRoute element={<SignIn/>}/>},
    {path:'/user/profile', element:<ProtectedRouteHome element={<UserProfile/>}/>},
])