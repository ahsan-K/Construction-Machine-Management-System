import { createSlice } from '@reduxjs/toolkit';
const initialState:any = {
    data: [
        // {
        //     categoryName: "Deisal cars",
        //     machines: [
        //         {
        //             machineName: "machineName",
        //             attributes: [
        //                 {
        //                     type: "text",
        //                     value: "",
        //                     label: ""

        //                 },
        //                 {
        //                     type: "number",
        //                     value: "",
        //                     label: ""

        //                 },
        //                 {
        //                     type: "checkBox",
        //                     value: false,
        //                     label: ""
        //                 },
        //                 {
        //                     type: "date",
        //                     value: "",
        //                     label: ""

        //                 }
        //             ]
        //         }
        //     ],
        //     fields: [
        //         {
        //             type: "text",
        //             value: "",
        //             label: ""

        //         },
        //         {
        //             type: "number",
        //             value: "",
        //             label: ""

        //         },
        //         {
        //             type: "checkBox",
        //             value: false,
        //             label: ""
        //         },
        //         {
        //             type: "date",
        //             value: "",
        //             label: ""

        //         }
        //     ]
        // }
    ],
}
const MachineSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMachine: (state, action) => {
            state.data = action.payload
        },
        changeAttributeValue: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            console.log(action.payload, ' sss')
            tempData[action.payload.item?.categoryIndex].machines[action.payload.item?.machineIndex].attributes[action.payload.attributeIndex].value = action.payload?.value
            state.data = tempData
        },

        changeCategoryName: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            tempData[action.payload.index].categoryName = action.payload.value
            state.data = tempData
        },
        changeCategoryFieldLabel: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            tempData[action.payload.item?.categoryIndex].fields[action.payload?.fieldIndex].label = action.payload.value
            state.data = tempData
        },

        deleteCategoryField: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            tempData[action.payload?.categoryIndex].fields.splice(action.payload.fieldIndex, 1)
            state.data = tempData
        },

        addCategory: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            tempData.push({categoryName: action.payload + tempData.length, machines:[], fields:[]})
            state.data = tempData
        },

        addField: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            tempData[action.payload.categoryIndex].fields.push(action.payload.field)
            state.data = tempData
        },

        addFieldIntoExistingCategory: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            let fields = tempData[action.payload.categoryIndex].fields
            tempData[action.payload.categoryIndex].machines.push({
                machineName:"",
                attributes:fields

            })
            state.data = tempData
        },
        deleteMachine: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            tempData[action.payload.categoryIndex].machines?.splice(action.payload.categoryIndex, 1)
            state.data = tempData

        },
        removeCategory: (state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            tempData?.splice(action.payload.categoryIndex, 1)
            state.data = tempData
        },
        updateAttributes:(state, action) => {
            let tempData = [...state.data].map(x => { return { ...x } });
            let fields = tempData[action.payload.categoryIndex].fields
            tempData[action.payload.categoryIndex].machines = fields
        }



    },
    extraReducers: (builder) => {

    },
});
const { actions, reducer } = MachineSlice
export const { 
        setMachine, 
        changeAttributeValue, 
        changeCategoryName, 
        changeCategoryFieldLabel, 
        deleteCategoryField,
        addCategory,
        addField,
        addFieldIntoExistingCategory,
        deleteMachine,
        removeCategory,
        updateAttributes
 } = actions
export const MachineSelector = (state: { machineSlice: { data: object } }) => state.machineSlice

export default reducer;