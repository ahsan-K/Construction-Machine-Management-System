import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Dashboard, Categories, ManageCategories } from './src/screens'
import { useSelector } from 'react-redux';
import { RootState } from './src/redux/store';

const Drawer = createDrawerNavigator();

export default function Routes() {
  const categories = useSelector((state: RootState) => state.machineReducer.data)

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        {
          categories.map((item:any, index:number)=>(
            <Drawer.Screen initialParams={{ item, index }}
            name={item?.categoryName} component={Categories} />
          ))
        }
        <Drawer.Screen name="Manage Categories" component={ManageCategories} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}