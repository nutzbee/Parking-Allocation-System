import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ParkingScreen from './ParkingScreen';
import UnparkingScreen from './UnparkingScreen';

const AppNavigator = createStackNavigator(
  {
    Parking: ParkingScreen,
    Unparking: UnparkingScreen
  },
  {
    initialRouteName: 'Parking'
  }
);

export default createAppContainer(AppNavigator);