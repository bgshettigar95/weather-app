import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CityManagement from './screens/CityManagement';
import Home from './screens/Home';
import CityDetail from './screens/CityDetail';
import WeatherContextProvider from './context/weather-context';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
