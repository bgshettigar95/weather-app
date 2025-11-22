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
import { capitalize } from "../utils";

const API_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const { API_KEY } = Constants.expoConfig.extra;

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const CityManagement = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citiesWeather, setCitiesWeather] = useState([]);

  const { temp, lang, searchedCities, onCitySearch } =
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
    onCitySearch(city);
    setQuery("");
    navigation.navigate("CityDetail", { city });
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
    console.log(cities);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCitiesWeather();
  }, [searchedCities]);

  const goToCityDetail = (city) => {
    navigation.navigate("CityDetail", { city: city.coord });
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.dropdown}>
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
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => goToCityDetail(item)}>
                  <View style={styles.cityWeatherContainer}>
                    <View>
                      <Text style={styles.city}>{item.name}</Text>
                      <Text style={styles.cityDesc}>
                        {capitalize(item.weather[0].description)}
                      </Text>
                    </View>
                    <View style={styles.tempContainer}>
                      <Text style={styles.temperature}>{item.main.temp}</Text>
                      <Text style={styles.tempUnit}>{temp.name}</Text>
                    </View>
                  </View>
                </Pressable>
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
    zIndex: 10,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
  cityWeatherContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  city: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cityDesc: {
    fontSize: 16,
    color: "grey",
  },

  tempContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  temperature: {
    fontSize: 30,
    fontWeight: "bold",
  },
  tempUnit: {
    marginTop: 6,
    fontSize: 12,
    color: "grey",
  },
});

export default CityManagement;
