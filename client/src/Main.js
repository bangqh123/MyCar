import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import Login from './auth/Login'
import Register from './auth/Register'
import NavigationBottom from './NavigationBottom'
import Mycar from './car/Mycar'
import Profile from './account/Profile'
import DetailCar from './car/DetailCar'
import Editprofile from './account/Editprofile'
import AddCar from './car/AddCar'
import CarDis from './home/CarDis'
import EditCar from './car/EditCar'
import Booking from './booking/Booking';
 
export default function Main(){
    return(
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={Register}/>
            <Stack.Screen name='Navi' component={NavigationBottom} />
            <Stack.Screen name='Pro' component={Profile} />
            <Stack.Screen name='MyCar' component={Mycar} />
            <Stack.Screen name='Detail' component={DetailCar} />
            <Stack.Screen name='Edit' component={Editprofile} />
            <Stack.Screen name='AddCar' component={AddCar} />
            <Stack.Screen name='CarDis' component={CarDis} />
            <Stack.Screen name='EditCar' component={EditCar} />
            <Stack.Screen name='Booking' component={Booking} />
        </Stack.Navigator>  
    )      
}