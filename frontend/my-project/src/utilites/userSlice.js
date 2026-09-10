import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        items:[],
        loading:true,
    },
    reducers:{
        addUser:(state,action)=>{
            state.items.push(action.payload)
        },
        updateUser: (state, action) => {
            state.items[0] = action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        deleteUser:(state)=>{
            state.items.pop()
        }
    }
})
export const {addUser,updateUser,setLoading,deleteUser}=userSlice.actions
export default userSlice.reducer