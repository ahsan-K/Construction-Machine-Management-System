import React, {useEffect} from 'react';
import {
    Text,
    View,
    FlatList,
    TextInput,
    SafeAreaView,
    Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { globalStyles, globalViewPadding } from '../../utils/constants';
import CheckBox from '@react-native-community/checkbox';
import { addFieldIntoExistingCategory, changeAttributeValue, deleteMachine, updateAttributes } from '../../redux/machineSlice';
import RNDatePicker from '@react-native-community/datetimepicker';

const Category = ({ route }: any) => {
    const Machines = useSelector((state: RootState) => state.machineReducer.data)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(Machines[route.params.index]?.fields.length !== Machines[route.params.index]?.machines.length){
            dispatch(updateAttributes({categoryIndex:route.params.index}))
        }
    },[Machines[route.params.index]?.fields])

    const RenderAttributes = ({ item, index, key }: any) => {
        if (item?.type === "text" || item?.type === "number") {
            return (
                <View key={key} style={globalStyles.attributesContainer}>
                    <TextInput
                        onChangeText={(e) => dispatch(changeAttributeValue({ value: e, item, attributeIndex: index }))}
                        style={globalStyles.input}
                        keyboardType={item?.type === "text" ? "default" : (item?.type === "number" ? "number-pad" : "default")}
                        defaultValue={item?.value} />
                </View>
            )
        }
        else if (item?.type === "checkbox") {
            return (
                <View key={key} style={globalStyles.checkBoxContainer}>
                    <CheckBox
                        value={item?.value}
                        onValueChange={(e) => dispatch(changeAttributeValue({ value: e, item, attributeIndex: index }))}
                        style={globalStyles.checkBox}
                    />
                    <Text style={globalStyles.label}>{item?.label}</Text>
                </View>
            )
        }
        else {
            return (
                <View key={key} style={globalStyles.datePickerContainer}>
                    <Text style={globalStyles.fieldTypeLabel}>{item?.type}</Text>
                    <RNDatePicker onChange={(e, date)=> {
                        dispatch(changeAttributeValue({ value: date, item, attributeIndex: index }))
                    }} value={new Date(item.value)} mode="date" />
                </View>

            )
        }
    }

    const renderMachine = ({ item, index }: any) => (
        <View style={globalStyles.card}>
            <Text style={globalStyles.machineHeading}>{item?.machineName}</Text>
            {
                item?.attributes.map((x: any) => { return { ...x, machineIndex: index, categoryIndex: item.categoryIndex } })
                    .map((item: any, index: number) => (
                        <RenderAttributes key={index} item={item} index={index} />
                    ))
            }
            <Button onPress={(e) => dispatch(deleteMachine({ categoryIndex: item?.categoryIndex }))} title={"Delete"} />

        </View>
    )
    return (
        <SafeAreaView>
            <View style={[globalViewPadding, {marginBottom:50}]}>
                <FlatList
                    data={Machines[route.params.index]?.machines?.map((x: any) => { return { ...x, categoryIndex: route.params.index } })}
                    renderItem={renderMachine}
                    keyExtractor={item => item?.categoryIndex}
                />
                <Button onPress={(e) => dispatch(addFieldIntoExistingCategory({
                    categoryIndex: route.params.index,
                }))} title={"Add New Fields"} />

            </View>

        </SafeAreaView>
    );
};

export default Category;