import { createSlice } from '@reduxjs/toolkit';

const MachineSlice = createSlice({
    name: "auth",
    initialState: {
        data: [],
       
    },
    reducers: {
        setMachine: (state, action) => {
            state.data = action.payload
        },
       
    },
    extraReducers: (builder) => {
       
    },
});
const { actions, reducer } = MachineSlice
export const { setMachine } = actions
export const MachineSelector = (state: { machineSlice: { data: object } }) => state.machineSlice

export default reducer;