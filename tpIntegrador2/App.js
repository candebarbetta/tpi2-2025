import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import HomeMenu from './src/Components/HomeMenu'
import AntDesign from '@expo/vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <AntDesign name="twitter" size={40} color="blue" style={styles.logo} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="HomeMenu" component={HomeMenu} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: "#f5f8fa",
  },
  logo: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 5,
    color: "#1DA1F2"
  }
});
