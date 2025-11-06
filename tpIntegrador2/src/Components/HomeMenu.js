import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, View } from "react-native";

import NuevoPost from "../Screens/NuevoPost";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <View style={styles.contenedor}>
            
            
            <Tab.Navigator>
                 <Tab.Screen 
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <AntDesign name="home" size={24} color="black" style={styles.icono}/>
                        ),
                    }}
                    name="Stack" 
                    component={Stack} 
                />
                
            
                <Tab.Screen 
                    options={{
                        headerShown: false,
                        tabBarIcon: () => (
                            <AntDesign name="plus" size={24} color="black" style={styles.icono}/>
                        ),
                    }}
                    name="NuevoPost" 
                    component={NuevoPost} 
                />
            
                <Tab.Screen 
                    name="Profile" 
                    component={Profile} 
                    options={{
                        headerShown: false, 
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" style={styles.icono}/>
                        ),
                    }} 
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#f5f8fa"
    },
    icono: {
        color: "#1da1f2"
    },
    barra: {
        backgroundColor: "#ffffff",
        borderTopColor: "#e1e8ed",
        borderTopWidth: 1
    }
});

export default HomeMenu;
