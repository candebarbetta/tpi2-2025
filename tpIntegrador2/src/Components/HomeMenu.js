import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

import NuevoPost from "../Screens/NuevoPost";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";


const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen options={
                {
                    headerShown: false,
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
                }
            }
                name="Home" component={Home} />
            
        
            <Tab.Screen options={
                {
                    headerShown: false,
                    tabBarIcon: () => <AntDesign name="plus" size={24} color="black" />
                }
            }
                name="NuevoPost" component={ NuevoPost } />
            
            <Tab.Screen 
            name="Profile" component={Profile} 
            options={
                {headerShown: false, 
                tabBarIcon: ()=> <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />}} />

            

        </Tab.Navigator>

    );
}


export default HomeMenu;