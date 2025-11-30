import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { WeatherContext } from "../context/weather-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { capitalize, debounce } from "../utils";
import { StatusBar } from "expo-status-bar";
import WeatherBackground from "../components/WeatherBackground";
import { Swipeable } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const API_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const { API_KEY } = Constants.expoConfig.extra;

const CityManagement = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citiesWeather, setCitiesWeather] = useState([]);

  const { temp, lang, searchedCities, onCitySearch, onDeleteCity } =
    useContext(WeatherContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "City Management",
    });
  }, []);

  const fetchCities = async (text) => {
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const url = `${API_URL}?q=${text}&limit=5&appid=${API_KEY}`;
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchCities, 500), []);

  const handleChange = (text) => {
    setQuery(text);
    debouncedFetch(text); // typed value goes through debounce
  };

  const onSelectCity = (city) => {
    const selectedCity = {
      lat: city.lat,
      lon: city.lon,
      city: city.name,
      country: city.country,
    };

    onCitySearch(selectedCity);
    setQuery("");
    navigation.navigate("CityDetail", { city: selectedCity });
  };

  const fetchCityWeather = async (city) => {
    try {
      setLoading(true);
      const url = `${WEATHER_API_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=${temp.tempUnit}&lang=${lang.name}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      alert("City not found!");
      console.error(error);
    }
  };

  const fetchAllCitiesWeather = async () => {
    const cities = [];
    for (let city of searchedCities) {
      const weather = await fetchCityWeather(city);
      cities.push(weather);
    }
    setCitiesWeather(cities);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCitiesWeather();
  }, [searchedCities]);

  const goToCityDetail = (city) => {
    navigation.navigate("CityDetail", { city });
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <StatusBar style="dark" />
      <View style={styles.inputContainer}>
        {query.length === 0 && (
          <Ionicons name="search" size={24} color="grey" />
        )}
        <TextInput
          style={styles.input}
          value={query}
          placeholder="Search for city weather"
          onChangeText={handleChange}
        />
      </View>
      {suggestions.length > 0 && (
        <View style={styles.dropdown} pointerEvents="auto">
          <FlatList
            data={suggestions}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelectCity(item);
                  setSuggestions([]); // hide dropdown
                }}
              >
                <Text style={styles.text}>
                  {item.name}
                  {item.state ? `, ${item.state}` : ""}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {loading && <ActivityIndicator style={styles.container} size="large" />}

      {citiesWeather.length > 0 && (
        <View>
          <FlatList
            data={citiesWeather}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => {
              return (
                <Swipeable
                  leftThreshold={60}
                  rightThreshold={60}
                  renderRightActions={() => (
                    <View style={styles.deleteIconContainer}>
                      <Pressable
                        onPress={() => onDeleteCity(searchedCities[index])}
                      >
                        <MaterialIcons name="delete" size={24} color="black" />
                      </Pressable>
                    </View>
                  )}
                  renderLeftActions={() => (
                    <View style={styles.deleteIconContainer}>
                      <Pressable
                        onPress={() => onDeleteCity(searchedCities[index])}
                      >
                        <MaterialIcons name="delete" size={24} color="black" />
                      </Pressable>
                    </View>
                  )}
                  onSwipeableOpen={(direction) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <Pressable
                    onPress={() => goToCityDetail(searchedCities[index])}
                  >
                    <View style={styles.weatherContainer}>
                      <View style={styles.roundedClipper}>
                        <WeatherBackground currentWeather={item}>
                          <View style={styles.cityWeatherContainer}>
                            <View>
                              <Text style={styles.city}>
                                {searchedCities[index]?.city}
                              </Text>
                              <Text style={styles.cityDesc}>
                                {capitalize(item.weather[0].description)}
                              </Text>
                            </View>
                            <View style={styles.tempContainer}>
                              <Text style={styles.temperature}>
                                {item.main.temp}
                              </Text>
                              <Text style={styles.tempUnit}>{temp.name}</Text>
                            </View>
                          </View>
                        </WeatherBackground>
                      </View>
                    </View>
                  </Pressable>
                </Swipeable>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 100,
    zIndex: 1,
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#989393ff",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  input: {
    height: 45,
    fontSize: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdown: {
    backgroundColor: "#fff",
    marginTop: 8,
    borderRadius: 8,
    elevation: 3,
    position: "absolute",
    width: "100%",
    top: 40,
    zIndex: 999,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
  roundedClipper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  weatherContainer: {
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cityWeatherContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 4,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  city: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  cityDesc: {
    fontSize: 16,
    color: "#fff",
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  temperature: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  tempUnit: {
    marginTop: 6,
    fontSize: 12,
    color: "lightgrey",
  },
  deleteIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CityManagement;
