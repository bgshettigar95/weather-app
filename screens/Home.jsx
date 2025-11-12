import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import WheatherInfo from "../components/WheatherInfo";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
// import Config from "react-native-config";

// console.log(Config.API_URL);

const Home = () => {
  const [loactionPermission, requestLocationPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  const verifyLocationPermission = async () => {
    if (loactionPermission.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestLocationPermission();

      return permission.granted;
    }

    if (loactionPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Not sufficient access",
        " Please grant access to location to use this feature"
      );
      return false;
    }

    return true;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyLocationPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const getWheatherForecast = async () => {};

  useEffect(() => {
    locateUserHandler();
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <WheatherInfo />
    </View>
  );
};

export default Home;
