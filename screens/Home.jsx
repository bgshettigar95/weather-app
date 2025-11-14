import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import WeatherInfo from "../components/WeatherInfo";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  reverseGeocodeAsync,
  useForegroundPermissions,
} from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = ({ navigation }) => {
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [cityName, setCityName] = useState(null);

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

      const address = await reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const city = address[0]?.city || address[0]?.region || "Unknown location";
      setCityName(city);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location.");
      console.error(error);
    }
  }, [verifyLocationPermission]);

  // Run once when component mounts
  useEffect(() => {
    locateUserHandler();
  }, [locateUserHandler]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: cityName || "Weather App",
      headerRight: () => (
        <View style={styles.configuration}>
          <Pressable onPress={() => navigation.navigate("CityManagement")}>
            <Ionicons
              name="list"
              size={24}
              color="black"
              style={styles.listIcon}
            />
          </Pressable>
          <Ionicons name="settings" size={24} color="black" />
        </View>
      ),
    });
  });

  if (!cityName) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <View style={styles.container}>
      {pickedLocation && <WeatherInfo location={pickedLocation} />}
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
  configuration: {
    flexDirection: "row",
  },
  listIcon: {
    marginRight: 20,
  },
});
