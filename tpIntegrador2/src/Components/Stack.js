import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Comentarios from './src/Screens/Comentarios'
import Home from '../Screens/Home';

const Stack = createNativeStackNavigator();

function Stack() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options={ { headerShown: false } }/>
        <Stack.Screen name="Comentarios" component={ Comentarios } options={ { headerShown: false } }/>
     </Stack.Navigator>
   </NavigationContainer>
);
};

export default Stack;