import ParkingScreen from './ParkingScreen';
import UnparkingScreen from './UnparkingScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const screenList = [
  {
    name: 'Parking',
    component: ParkingScreen,
  },
  {
    name: 'Unparking',
    component: UnparkingScreen,
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screenList.map((screen) => (
          <Stack.Screen name={screen.name} component={screen.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
