import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import backendApi from "../../api/backendApi";
import { toast } from "sonner";
import type { NavigateFunction } from "react-router-dom";

interface User {
  _id: string;
  email: string;
  name?: string;
  token: string;
  uploadCount: number;
  downloadCount: number;
}

export interface AuthState {
  loggedInUser: User | null;
  loading: boolean;
}

// const initialState = {
//   loggedInUser: null,
//   loading: false,
// }; ? why error in state manage management!
const initialState : AuthState = {
  loggedInUser: null,
  loading: false,
};

interface SignupPayload {
  email: string;
  password: string;
}
interface SignInPayload {
  email: string;
  password: string;
  navigate:NavigateFunction
}
export interface AuthResponse {
  //type of backend api result
  success: boolean;
  message: string;
  user?: User;
}

export const signUpUser = createAsyncThunk<
  void,
  SignupPayload,
  { rejectValue: string }
>("auth/sign-up-user", async (payload, thunkApi) => {
  try {
    const { data } = await backendApi.post<AuthResponse>(
      "/api/v1/auth/sign-up",
      payload,
    ); //third param is config that need to sent to backend
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.warning(data.message);
    }
  } catch (error: any) {
    // console.error(error.response?.data?.message);
    console.error(error);
    toast.error(error.message);
  }
});

export const signInUser = createAsyncThunk<
  string | null,
  SignInPayload,
  { rejectValue: string }
>("auth/sign-in-user", async (payload, thunkApi) => {
  try {
    const { email, password, navigate } = payload;
    const { data } = await backendApi.post<AuthResponse>(
      "/api/v1/auth/sign-in",
      { email, password },
    );
    if (data.success && data.user?.token) {
      if (data.user) {
        toast.success(data.message);
        localStorage.setItem("token", data.user.token);
        navigate('/user/profile')
      }
      return data.user?.token || null;
    } else {
      toast.warning(data.message);
      return thunkApi.rejectWithValue(data.message);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
    return thunkApi.rejectWithValue(errorMessage);
  }
});

export const fetchUserDetails = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/fetch-user-details", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkApi.rejectWithValue("No token found");
    }
    const {data} = await backendApi.get<AuthResponse>('/api/v1/user/profile',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    if(data.success && data.user){
      return data.user 
      // ? why error in call back function
      // return data.user ?? null
    }else{
      return thunkApi.rejectWithValue(data.message)
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
    return thunkApi.rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { //Synchronus actions are given here
    logOutUser:(state, action)=>{
      const navigate = action.payload
      localStorage.removeItem('token')
      state.loggedInUser = null
      toast.info('See you soon')
      navigate('/sign-in')
    },

    updateUser:(state, action)=>{
      const {name,email}= action.payload;
      if(state.loggedInUser){
        state.loggedInUser.name = name;
        state.loggedInUser.email = email;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        // state.loggedInUser = action.payload
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const authReducer = authSlice.reducer;
export const {logOutUser, updateUser} = authSlice.actions
export const slelectLoggedInUser = (state: RootState) =>
  state.auth.loggedInUser;
export const selectLoading = (state: RootState) => state.auth.loading;
