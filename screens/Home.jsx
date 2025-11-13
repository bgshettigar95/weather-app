import React, { useEffect, useState, useCallback } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import WeatherInfo from "../components/WeatherInfo";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import Constants from "expo-constants";

const { API_KEY } = Constants.expoConfig.extra;

const Home = () => {
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState(null);

  // Verify location permission
  const verifyLocationPermission = useCallback(async () => {
    if (!locationPermission) {
      const permission = await requestLocationPermission();
      return permission?.granted ?? false;
    }

    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestLocationPermission();
      return permission?.granted ?? false;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Location Access Needed",
        "Please grant access to location to use this feature."
      );
      return false;
    }

    return true;
  }, [locationPermission, requestLocationPermission]);

  // Fetch user location
  const locateUserHandler = useCallback(async () => {
    const hasPermission = await verifyLocationPermission();
    if (!hasPermission) return;

    try {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location.");
      console.error(error);
    }
  }, [verifyLocationPermission]);

  // Run once when component mounts
  useEffect(() => {
    locateUserHandler();
  }, [locateUserHandler]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <WeatherInfo location={pickedLocation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
});
