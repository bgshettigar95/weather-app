import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";
import WeatherForecast from "./WeatherForecast";
import { capitalize } from "../utils";
import { WeatherContext } from "../context/weather-context";

const { API_KEY } = Constants.expoConfig.extra;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherInfo = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang, temp } = useContext(WeatherContext);

  const getWeather = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${temp.tempUnit}&lang=${lang.name}`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      alert("City not found!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [lang.name, temp.name]);

  if (loading) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentLocation}>
        {weatherData.name}, {weatherData.sys.country}
      </Text>
      <Text style={styles.description}>
        {capitalize(weatherData.weather[0].description)}
      </Text>
      <WeatherIcon
        weatherType={weatherData.weather[0].main}
        size={100}
        icon={weatherData.weather[0].icon}
      />
      <Text style={styles.temperature}>
        {weatherData.main.temp}
        {temp.name}
      </Text>
      <Text>Humidity: {weatherData.main.humidity}%</Text>
      <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>

      <WeatherForecast location={location} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  currentLocation: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
  },
  temperature: {
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default WeatherInfo;
