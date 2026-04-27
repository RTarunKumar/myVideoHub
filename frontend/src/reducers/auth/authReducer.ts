import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import backendApi from "../../api/backendApi";
import { toast } from "sonner";

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

const initialState = {
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
}
interface AuthResponse {
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
      "/api/v1/auth/sign-up", payload
    );//third param is config that need to sent to backend
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.warning(data.message);
    }
  } catch (error:any) {
    // console.error(error.response?.data?.message);
    console.error(error)
    toast.error(error.message)
  }
});

export const signInUser = createAsyncThunk<string | null, SignInPayload, {rejectValue:string}>('auth/sign-in-user', async(payload, thunkApi)=>{
    try {
        const {email, password} = payload
        const {data} = await backendApi.post<AuthResponse>('/api/v1/auth/sign-in', {email, password})
        if (data.success && data.user?.token) {
            if(data.user){
                toast.success(data.message)
                localStorage.setItem('token', data.user.token)
            }
            return data.user?.token || null
        }else{
            toast.warning(data.message)
            return thunkApi.rejectWithValue(data.message)
        }
    } catch (error:any) {
        toast.error(error)
        return thunkApi.rejectWithValue(error)
    }
}) 

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(signInUser.pending, (state)=>{
        state.loading = true
    })
    .addCase(signInUser.fulfilled, (state)=>{
        // state.loggedInUser = action.payload
        state.loading = false
    })
        .addCase(signInUser.rejected, (state)=>{
        state.loading = false
    })
  }
});


export const authReducer = authSlice.reducer;
export const slelectLoggedInUser = (state: RootState) =>
  state.auth.loggedInUser;
export const slelectLiading = (state: RootState) => state.auth.loading;
