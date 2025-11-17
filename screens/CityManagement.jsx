import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const API_URL = "https://api.openweathermap.org/geo/1.0/direct";
const { API_KEY } = Constants.expoConfig.extra;

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const CityManagement = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigation = useNavigation();

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
    setSelectedCity(city);
    navigation.navigate("CityDetail", { city });
  };

  return (
    <View>
      <TextInput placeholder="Search city" onChangeText={handleChange} />

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
                  setQuery(`${item.name}, ${item.country}`);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    height: 45,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#fff",
    marginTop: 8,
    borderRadius: 8,
    elevation: 3,
    maxHeight: 200,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
});

export default CityManagement;
