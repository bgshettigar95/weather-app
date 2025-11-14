import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import axios from "axios";

const { API_KEY } = Constants.expoConfig.extra;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherInfo = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}?lat=${location.lat}&lon=${location.lng}&appid=${API_KEY}`;
      const response = await axios.get(url);
      console.log(response.data);

      setWeather(response.data);
    } catch (error) {
      alert("City not found!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View>
      <Text>WeatherInfo</Text>
    </View>
  );
};

export default WeatherInfo;
