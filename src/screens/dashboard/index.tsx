import * as React from 'react';
import {
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { globalStyles, globalViewPadding } from '../../utils/constants';
import CheckBox from '@react-native-community/checkbox';
import { changeAttributeValue } from '../../redux/machineSlice';
import RNDatePicker from '@react-native-community/datetimepicker';


const Dashboard = () => {
    const Categories = useSelector((state: RootState) => state.machineReducer.data)
    const dispatch = useDispatch()
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
        else if (item?.type === "checkBox") {
            return (
                <View key={key} style={globalStyles.checkBoxContainer}>
                    <CheckBox
                        value={item?.value}
                        onValueChange={(e) => dispatch(changeAttributeValue({ value: e, item, attributeIndex: index }))}
                        style={globalStyles.checkBox}
                    />
                    <Text style={globalStyles.label}>{item?.value}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={globalStyles.datePickerContainer}>
                    <Text style={globalStyles.fieldTypeLabel}>{item?.type}</Text>
                    <RNDatePicker onChange={(e, date)=> {
                        dispatch(changeAttributeValue({ value: date, item, attributeIndex: index }))
                    }} key={key} value={isNaN(new Date(item?.value)) ? new Date() : new Date(item?.value)} mode="date" />
                </View>
            )
        }
    }


    const RenderMachine = ({ item, index }: any) => (
        <View style={globalStyles.card}>
            <Text style={globalStyles.machineHeading}>{item?.machineName}</Text>
            {
                item?.attributes?.map((x: any) => { return { ...x, machineIndex: index, categoryIndex: item.categoryIndex } })
                    .map((item: any, index: number) => (
                        <RenderAttributes key={index} item={item} index={index} />
                    ))
            }
        </View>
    )

    return (
        <SafeAreaView>
            <ScrollView style={globalViewPadding}>
            {!Categories.length ? <Text style={[globalStyles.label, { color: 'gray', textAlign: 'center', marginVertical: 10 }]}>There is no category.</Text> : null}

                {
                    Categories.map((item: any, index: number) => (
                        <>
                        
                            <Text style={globalStyles.heading}>{item?.categoryName}</Text>
                            {!item?.machines.length ? <Text style={[globalStyles.label, { color: 'gray', textAlign: 'center', marginBottom: 10 }]}>There is no machine associated with this cateogry yet.</Text> : null}
                            {
                                item?.machines?.map((x: any) => { return { ...x, categoryIndex: index } })
                                    .map((item: any, index: number) => (
                                        <RenderMachine key={index} item={item} index={index} />
                                    ))
                            }
                        </>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;