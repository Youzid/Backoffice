import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILocationResponseBody } from "../../data/response/ILocationResponseBody";

export type IShoppingMode = "directShopping" | "order" | "rental" | "facilitated";


export interface IBackOfficeState {
  formStep:number
  createdLocation:ILocationResponseBody | null
}

const initialState: IBackOfficeState  = {
  formStep: 1,
  createdLocation:null,
};
const maxStep = 3;
const minStep = 1;

const BackOffice = createSlice({
  name: "backOffice",
  initialState,
  reducers: {
    handleStepChange: (state, action: PayloadAction<number>) => {
      state.formStep = action.payload > minStep ? (action.payload < maxStep ? action.payload: maxStep) : minStep;
    },
    handleLocationCreation: (state, action: PayloadAction<ILocationResponseBody|null>) => {
      state.createdLocation = action.payload ;
    },
  }
});

export const { handleStepChange,handleLocationCreation } = BackOffice.actions;

export default BackOffice.reducer;