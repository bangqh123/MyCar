import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './home/Home';
import Notifications from './notify/Notifications';
import Account from './account/Account';
import History from './history/History'

export default function NavigationBottom({route}){

    const Tab = createBottomTabNavigator()

    const {userId} = route.params
    const id = userId

    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'HOME') {
                iconName = focused
                    ? 'md-home'
                    : 'md-home-outline';
                } else if (route.name === 'NOTIFICATION') {
                iconName = focused 
                ? 'notifications-circle' 
                : 'notifications-circle-outline';
                } else if (route.name === 'TRIP HISTORY'){
                    iconName = focused 
                    ? 'md-car' 
                    : 'md-car-outline';
                } else if (route.name === 'ACCOUNT'){
                iconName = focused 
                ? 'person-circle' 
                : 'person-circle-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerTintColor: 'red',
            headerTitleStyle: 'bold',
            headerTitleAlign: 'center',
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            })}
        >

            <Tab.Screen name="HOME" component={Home} initialParams={{userId: id}}/>
            <Tab.Screen name="NOTIFICATION" component={Notifications} initialParams={{userId: id}}/>
            <Tab.Screen name="TRIP HISTORY" component={History} initialParams={{userId: id}}/>
            <Tab.Screen name="ACCOUNT" component={Account} initialParams={{userId: id}}/>
        </Tab.Navigator>  
    )      
}