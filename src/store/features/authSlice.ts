import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuthenticated: boolean;
  namespaceId:string | null
  namespace:string | null
  fullname:string | null
  username: string| null;
  email?:string | null
  userType: 'admin' | null
  token: string | null;
  language:string | null;
  permissions: Record<string, any> | null;
}

const initialState:IAuthState = {
  isAuthenticated: false,
  namespaceId:null,
  namespace:null,
  fullname:null,
  username:null,
  email:null,
  userType:null,
  token: null,
  language: null,
  permissions: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials:(state,action:PayloadAction<IAuthState>)=>{
      
      const {token,username,fullname,email,namespace,namespaceId,userType,permissions,language}= action.payload;
      return {
        ...state,
        isAuthenticated:true,
        namespaceId,
        namespace,
        fullname,
        username,
        email,
        userType,
        token,
        language,
        permissions,
      };

    },
    removeCredentials:(state)=>{
      return {
        ...state,
        isAuthenticated: false,
        namespaceId:null,
        namespace:null,
        fullname:null,
        username:null,
        email:null,
        userType:null,
        isConnected:null,
        token: null,
        language: null,
        permissions: null,
      };
    },
  },
});

export const {
  setCredentials,removeCredentials
} = authSlice.actions;

export default authSlice.reducer;