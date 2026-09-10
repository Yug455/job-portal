import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name:"jobSlice",
    initialState:{
        items:[]
    },
    reducers:{
        addAllJob:(state,action)=>{
            state.items=action.payload
        } 
    }
})
export const {addAllJob}=jobSlice.actions
export default jobSlice.reducer