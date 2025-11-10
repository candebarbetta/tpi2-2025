import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Comentarios from '../Screens/Comentarios'
import Home from '../Screens/Home';

const Stack = createNativeStackNavigator();

function StackNav() {
   return (
      <Stack.Navigator>
         <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
         <Stack.Screen name="Comentarios" component={Comentarios} options={{ headerShown: false }} />
      </Stack.Navigator>
   );
};

export default StackNav;