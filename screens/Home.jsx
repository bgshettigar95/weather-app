import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import WeatherInfo from "../components/WeatherInfo";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  reverseGeocodeAsync,
  useForegroundPermissions,
} from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import Settings from "../components/Settings";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = 320;

const Home = ({ navigation }) => {
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [cityName, setCityName] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const translateX = useRef(new Animated.Value(width)).current;

  const toggleSettings = () => {
    Animated.timing(translateX, {
      toValue: isOpen ? width : width - DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsOpen((isOpen) => !isOpen));
  };

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
        lon: location.coords.longitude,
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
          <Pressable onPress={toggleSettings}>
            <Ionicons name="settings" size={24} color="black" />
          </Pressable>
        </View>
      ),
    });
  }, []);

  if (!cityName) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <View style={styles.container}>
      {pickedLocation && <WeatherInfo location={pickedLocation} />}
      {/* Tap outside to close */}
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleSettings}
          activeOpacity={1}
        />
      )}

      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <Settings />
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  drawer: {
    position: "absolute",
    top: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "#f1f1f1",
    paddingVertical: 20,
    elevation: 10,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  closeBtn: {
    marginTop: 30,
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  closeText: { color: "#fff", fontWeight: "bold" },
});
