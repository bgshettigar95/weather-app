import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CityDetail from './screens/CityDetail';
import CityManagement from './screens/CityManagement';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CityDetail" component={CityDetail} />
      <Stack.Screen name="CityManagement" component={CityManagement} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    // <View>
    //   <Text>Hello</Text>
    // </View>
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
