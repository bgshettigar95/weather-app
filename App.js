import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CityManagement from './screens/CityManagement';
import Home from './screens/Home';
import CityDetail from './screens/CityDetail';
import WeatherContextProvider from './context/weather-context';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CityDetail" component={CityDetail} />
      <Stack.Screen name="CityManagement" component={CityManagement} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <WeatherContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </WeatherContextProvider>
  );
}
