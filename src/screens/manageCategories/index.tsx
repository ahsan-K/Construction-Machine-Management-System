import React, { useState } from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
    TextInput,
    SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, addField, changeCategoryFieldLabel, changeCategoryName, deleteCategoryField, removeCategory } from '../../redux/machineSlice';
import { RootState } from '../../redux/store';
import { globalStyles, globalViewPadding } from '../../utils/constants';
import RNPickerSelect from 'react-native-picker-select';


const ManageCategories = () => {
    const Categories = useSelector((state: RootState) => state.machineReducer.data)
    const dispatch = useDispatch()
    const RenderFields = ({ item, index }: any) => {
        if (item?.type === "text" || item?.type === "number") {
            return (
                <View style={globalStyles.attributesContainer}>
                    <TextInput
                        onChangeText={(e) => dispatch(changeCategoryFieldLabel({ value: e, item, fieldIndex: index }))}
                        style={globalStyles.input}
                        keyboardType={item?.type === "text" ? "default" : (item?.type === "number" ? "number-pad" : "default")}
                        defaultValue={item?.value} />
                    <Text style={globalStyles.fieldTypeLabel}>{item?.type}</Text>
                    <Button onPress={(e) => dispatch(deleteCategoryField({ categoryIndex: item?.categoryIndex, fieldIndex: index }))} title={"Delete"} />
                </View>
            )
        }
        else if (item?.type === "checkBox") {
            return (
                <View style={globalStyles.attributesContainer}>
                    <TouchableOpacity style={globalStyles.datePickerInput}>
                        <Text style={globalStyles.label}>{item?.label}</Text>
                    </TouchableOpacity>
                    <Text style={globalStyles.fieldTypeLabel}>{item?.type}</Text>
                    <Button onPress={(e) => dispatch(deleteCategoryField({ categoryIndex: item?.categoryIndex, fieldIndex: index }))} title={"Delete"} />
                </View>
            )
        }
        else {
            return (
                <View style={globalStyles.attributesContainer}>
                    <TouchableOpacity style={globalStyles.datePickerInput}>
                        <Text style={globalStyles.label}>{item?.label}</Text>
                    </TouchableOpacity>
                    <Text style={globalStyles.fieldTypeLabel}>{item?.type}</Text>
                    <Button onPress={(e) => dispatch(deleteCategoryField({ categoryIndex: item?.categoryIndex, fieldIndex: index }))} title={"Delete"} />
                </View>
            )
        }
    }

    return (
        <SafeAreaView>
            <ScrollView style={globalViewPadding}>
                {
                    Categories?.map((item: any, index: number) => (
                        <View style={globalStyles.card}>
                            <Text style={globalStyles.machineHeading}>{item?.categoryName}</Text>
                            <View style={globalStyles.CategoryNameInputContainer}>
                                <TextInput
                                    onChangeText={(e) => dispatch(changeCategoryName({ value: e, index }))}
                                    style={globalStyles.input}
                                    defaultValue={item?.categoryName} />
                            </View>
                            {
                                item?.fields?.map((x: any) => { return { ...x, categoryIndex: index } })
                                    .map((item: any, index: number) => (
                                        <RenderFields item={item} index={index} />
                                    ))
                            }

                            <View style={globalStyles.categoryButtonsContainer}>
                                <View style={globalStyles.PickerContainer}>
                                    <RNPickerSelect
                                        placeholder={"Add Field"}
                                        onValueChange={(value) => {
                                            console.log(value, ' adsasdas')
                                            if(!value) return
                                            dispatch(addField({
                                                categoryIndex: index,
                                                field: {
                                                    label: "text",
                                                    type: value,
                                                    value: value === "date" ? new Date() : (value === "number" ? 0 : "New Value")
                                                }
                                            }))
                                        }}
                                        items={[
                                            { label: 'Text', value: 'text' },
                                            { label: 'Number', value: 'number' },
                                            { label: 'Date', value: 'date' },
                                            { label: 'Checkbox', value: 'checkbox' },

                                        ]}
                                    />
                                </View>
                                <Text style={[globalStyles.label, {marginStart:0}]}>Add Field</Text>


                                <Button onPress={(e) => dispatch(removeCategory("New Category"))} title={"Remove Category"} />
                            </View>
                        </View>
                    ))
                }
                <Button onPress={(e) => dispatch(addCategory("New Category"))} title={"Add New Category"} />

            </ScrollView>
            
        </SafeAreaView>
    );
};

export default ManageCategories;