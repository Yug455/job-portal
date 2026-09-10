import { configureStore } from "@reduxjs/toolkit"
import userSliceReducer from "./userSlice"
import jobSliceReducer from "./jobSlice"
const appStore = configureStore({
    reducer:{
        userSlice:userSliceReducer,
        jobSlice:jobSliceReducer
    }
})
export default appStore