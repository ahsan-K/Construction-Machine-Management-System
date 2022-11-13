
import { StyleSheet, Dimensions } from "react-native"

export const globalViewPadding = {
    paddingHorizontal: 10,
}

export const WIDTH = Dimensions.get('window').width

export const globalStyles = StyleSheet.create({
    card: {
        width: "100%",
        padding: 20,
        paddingBottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: '#fff',
        marginBottom: 10

    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10

    },
    machineHeading: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10
    },
    attributesContainer: {
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#f4f1f1',
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 5,
        borderWidth: 1,
        color: '#000',
        flex: 1
    },
    CategoryNameInputContainer: {
        width: '100%', height: 40, marginBottom: 10
    },
    fieldTypeLabel: {
        fontSize: 14,
        marginStart: 10,
        textTransform: 'uppercase',
        fontWeight: '500',
        color: 'gray'
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    checkBox: {

    },
    label: {
        fontSize: 14,
        marginStart: 10
    },
    datePickerInput: {
        backgroundColor: '#f4f1f1',
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 5,
        marginBottom: 10,
        borderWidth: 1,
        justifyContent: 'center',
        flex: 1
    },
    datePickerContainer:{
        flexDirection:'row', 
        width:'100%', 
        justifyContent:'space-between',
        marginBottom: 10,
    },
    categoryButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    PickerContainer: {
        width: 100,
        backgroundColor: '#f4f1f1',
        position: 'relative',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center',
        height:40
    }
})