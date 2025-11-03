import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

import NuevoPost from "../screens/NuevoPost";
import Home from "../screens/Home";
import { StyleSheet } from "react-native";

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

        </Tab.Navigator>

    );
}


export default HomeMenu;